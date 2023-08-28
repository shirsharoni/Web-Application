import express from "express";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";
import cron from "node-cron"; 


const app = express();
const port = 4000;
const ComeetApiToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjSWdzMnJyWEFaeWZ5Q1huelFmd1lWeDduUUptanBTRFJKRjciLCJleHAiOiIzMDAxOTQ4ODc5In0.6WqCzMqn38QjpWdIF_d-W-WkQAa517qJva8gSRZZU7M";

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// example:  http://localhost:4000/WSCandidates/B8.85816

app.get("/WSCandidates/:uid", async (req, res) => {
  const uid = req.params.uid;

  try {
    const response = await axios.get(
      `https://api.comeet.co/candidates/${uid}`,
      {
        headers: {
          Authorization: `Bearer ${ComeetApiToken}`,
        },
      }
    );

    const candidateDataBeforeMerge = response.data;

    // merging and sorting the steps to an array called 'steps' and adding a 'status' filed that indicates if the step is 'completed', 'current' or 'future'.
    // deleting from the steps the first two: cv screen and phone call.

    function mergeSteps(candidateData) {
      const currentSteps = candidateData.current_steps || [];
      const completedSteps = candidateData.completed_steps || [];
      const futureSteps = candidateData.future_steps || [];

      // Sort the completed steps by time_completed in ascending order
      const sortedCompletedSteps = completedSteps.slice().sort((a, b) => {
        const timeA = new Date(a.time_completed);
        const timeB = new Date(b.time_completed);
        return timeA - timeB; // ascending order
      });

      const allSteps = [
        ...sortedCompletedSteps,
        ...currentSteps,
        ...futureSteps,
      ];
      const uniqueSteps = Array.from(
        new Map(allSteps.map((step) => [step.position_step_uid, step])).values()
      );
      const stepsToKeep = uniqueSteps.filter(
        (step) =>
          step.name !== "CV Screen / Recruiter" &&
          step.name !== "Phone screen / Recruiter"
      );

      const latestCompletedStep = getLatestCompletedStep(
        currentSteps,
        sortedCompletedSteps
      );

      candidateData.steps = stepsToKeep.map((step) => {
        if (currentSteps.length === 0) {
          step.status = step === latestCompletedStep ? "current" : "future";
        } else if (
          currentSteps.some(
            (currentStep) =>
              currentStep.position_step_uid === step.position_step_uid
          )
        ) {
          step.status = currentStepHasNonNullScheduledTime(currentSteps, step)
            ? "current"
            : "future";
        } else if (step === latestCompletedStep) {
          step.status = "current";
        } else if (
          completedSteps.some(
            (completedStep) =>
              completedStep.position_step_uid === step.position_step_uid
          )
        ) {
          step.status = "completed";
        } else if (
          futureSteps.some(
            (futureStep) =>
              futureStep.position_step_uid === step.position_step_uid
          )
        ) {
          step.status = "future";
        }
        return step;
      });

      delete candidateData.current_steps;
      delete candidateData.completed_steps;
      delete candidateData.future_steps;

      return candidateData;
    }

    function currentStepHasNonNullScheduledTime(currentSteps, stepToCheck) {
      const currentStep = currentSteps.find(
        (step) => step.position_step_uid === stepToCheck.position_step_uid
      );
      return currentStep && currentStep.time_scheduled !== null;
    }

    function getLatestCompletedStep(currentSteps, completedSteps) {
      const latestCompletedStep = currentSteps.find(
        (currentStep) => currentStep.time_scheduled === null
      );
      if (latestCompletedStep) {
        const sortedCompletedSteps = completedSteps.slice().sort((a, b) => {
          const timeA = new Date(a.time_completed);
          const timeB = new Date(b.time_completed);
          return timeB - timeA;
        });
        return sortedCompletedSteps[0];
      }
      return null;
    }

    // cheacking if the candidate is Rejected and hide it if we need.

    function updateStatus(candidateData) {
      if (
        candidateData.status === "Rejected" &&
        candidateData.current_steps.length > 0
      ) {
        candidateData.status = "In-progress";
      }
      return candidateData;
    }

    const candidateDataAfterUpdate = updateStatus(candidateDataBeforeMerge);
    const candidateData = mergeSteps(candidateDataAfterUpdate);

    // Send the candidate information as a JSON response
    res.json(candidateData);

    // const candidateData = response.data;
    // res.json(candidateData);
  } catch (error) {
    // Handle errors, such as UID not found or API request failure
    res.status(404).json({ error: "Candidate not found" });
  }
});

// Schedule a task to run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  try {
    // Fetch the candidate list from Comeet API
    const response = await axios.get("https://api.comeet.co/candidates", {
      headers: {
        Authorization: `Bearer ${ComeetApiToken}`,
      },
    });

    const candidates = response.data.candidates;

    for (const candidate of candidates) {
      if (candidate.deleted === false) {
      
        //console.log(` ${candidate.uid} in the loop`);

        const customFieldsIsEmpty = Object.keys(candidate.custom_fields).length === 0;

        if (customFieldsIsEmpty) {
          // 'custom_fields' === null (new candidate with no url)
          console.log(
            `Candidate with UID ${candidate.uid} has a null portalUrl. Updating portalUrl...`
          );
          try {
              await axios.patch(`https://api.comeet.co/candidates/${candidate.uid}`, JSON.stringify({
                updated_by: {
                  type: 'app',
                  name: 'WSC-combine'
                },
                "custom_fields": {
                    "portalUrl": `http://localhost:4000/WSCandidates/${candidate.uid}`
                  }
              }), {
                headers: {
                  'Content-Type': 'application/json', // Set content type to JSON
                  Authorization: `Bearer ${ComeetApiToken}`
                }
              });
              console.log(`portalURL updated for candidate ${candidate.uid}`);
            } catch (error) {
              console.error(`Error updating portalURL for candidate ${candidate.uid}: ${error.message}`);
            }
          }
        }
      }
      } catch (error) {
        console.error("Error fetching candidate list:", error);
      }
      });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
