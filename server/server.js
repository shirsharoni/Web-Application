import express from "express";
import axios from "axios";
import cors from "cors";
import cron from "node-cron";
import fs from "fs/promises";
import crypto from "crypto";

const app = express();
const port = 4000;

// Environment variables
const key = process.env.ENCRYPTION_KEY || "secret";
const algorithm = process.env.ENCRYPTION_ALGORITHM || 'aes256';
const inputEncoding = process.env.ENCRYPTION_INPUT_ENCODING || 'utf8';
const outputEncoding = process.env.ENCRYPTION_OUTPUT_ENCODING || 'hex';
const ComeetApiToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjSWdzMnJyWEFaeWZ5Q1huelFmd1lWeDduUUptanBTRFJKRjciLCJleHAiOiIzMDAxOTQ4ODc5In0.6WqCzMqn38QjpWdIF_d-W-WkQAa517qJva8gSRZZU7M";
const slackToken = 'xoxb-5828413229749-5844534318449-nYJhp9vWQrO5cOoNGq8qTdg9'; 

// Middleware
app.use(cors({origin: "http://localhost:3000",}));

// Encryption functions
function encrypt(value, useKey = key) {
  var cipher = crypto.createCipher(algorithm, key);
  var encrypted = cipher.update(value, inputEncoding, outputEncoding);
  encrypted += cipher.final(outputEncoding)
  return encrypted
}

function decrypt(encrypted, useKey = key) {
  var decipher = crypto.createDecipher(algorithm, key);
  var decrypted = decipher.update(encrypted, outputEncoding, inputEncoding)
  decrypted += decipher.final(inputEncoding)
  return decrypted
}

// Helper functions
function mergeSteps(candidateData) { 
  /* merging and sorting the steps to an array called 'steps' and adding a 'status' filed that indicates if the step is 'completed', 'current' or 'future'.
   deleting from the steps the first two: cv screen and phone call.*/
  const currentSteps = candidateData.current_steps || [];
  const completedSteps = candidateData.completed_steps || [];
  const futureSteps = candidateData.future_steps || [];
  // Sort the completed steps by time_completed in ascending order
  const sortedCompletedSteps = completedSteps.slice().sort((a, b) => {
    const timeA = new Date(a.time_completed);
    const timeB = new Date(b.time_completed);
    return timeA - timeB; 
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

function updateStatus(candidateData) {
  // cheacking if the candidate is Rejected and hide it if we need.
  if (
    candidateData.status === "Rejected" &&
    candidateData.current_steps.length > 0
  ) {
    candidateData.status = "In-progress";
  }
  return candidateData;
}

async function getPositionName(positionUid) {
  try {
    const response = await axios.get(
      `https://api.comeet.co/positions/${positionUid}`,
      {
        headers: {
          Authorization: `Bearer ${ComeetApiToken}`,
        },
      }
    );
    return response.data.name; 
  } catch (error) {
    console.error(
      `Error fetching position name for UID ${positionUid}:`,
      error
    );
    return null;
  }
}

// Define a function to fetch and process candidates
async function getAllRefferalCandidates() {
  // Fetch the candidate list from Comeet API
  const response = await axios.get("https://api.comeet.co/candidates", {
    headers: {
      Authorization: `Bearer ${ComeetApiToken}`,
    },
  });
  return response.data.candidates.filter((candidate) => !candidate.deleted && candidate?.source?.type === "Referrer: Compensated");
}

async function getNotificationAudit() {
const fileContent = await fs.readFile("candidates.json", "utf8");
return JSON.parse(fileContent);
}

const filterCandidatesToNotify = (notificationAudit, candidatesArr) => candidatesArr.filter((candidate) => ((candidate?.current_steps != undefined && (notificationAudit[candidate.uid] != candidate.current_steps[0].position_step_uid) ) && candidate.current_steps[0].time_scheduled != null))

async function getUserIdByEmail(email) {
try {

  const response = await axios.post(
    'https://slack.com/api/users.lookupByEmail',
    `email=${encodeURIComponent(email)}`, // Encode the email
    {
      headers: {
        Authorization: `Bearer ${slackToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  if (response.data.ok) {
    return response.data.user.id;
  } else {
    throw new Error(`Error looking up user by email: ${response.data.error}`);
  }
} catch (error) {
  console.error('Error getting user ID by email:', error.message);
  throw error; // Re-throw the error for handling at a higher level if needed
}
}

async function notifyAndAudit(candidate) {
const message = `notify candidate ${candidate.first_name} to ${candidate.source.name}`;
console.log(message);

const slackToken = 'xoxb-5828413229749-5844534318449-nYJhp9vWQrO5cOoNGq8qTdg9';

// Retrieve user ID by email
const userId = await getUserIdByEmail('Ronyavivi0@gmail.com');

if (userId) {
  // Send message to the user with the obtained user ID
  try {

    const response = await axios.post(
      'https://slack.com/api/chat.postMessage',
      {
        channel: userId,
        text: message,
      },
      {
        headers: {
          Authorization: `Bearer ${slackToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Check if the message was sent successfully
    if (response.data.ok) {
      console.log('Message sent successfully to Slack');
    } else {
      console.error('Failed to send message to Slack:', response.data.error);
    }
  } catch (error) {
    console.error('Error sending message to Slack:', error.message);
  }
}
const notificationAudit = await getNotificationAudit();
notificationAudit[candidate.uid] = candidate.current_steps[0].position_step_uid;

// Assuming you have defined 'fs' somewhere in your code.
await fs.writeFile('candidates.json', JSON.stringify(notificationAudit), 'utf8');
}

// Routes
app.get("/WSCandidates/:uid", async (req, res) => {
  const uid = req.params.uid;
  try {
    const response = await axios.get(
      `https://api.comeet.co/candidates/${decrypt(uid)}`,
      {
        headers: {
          Authorization: `Bearer ${ComeetApiToken}`,
        },
      }
    );
    const candidateDataBeforeMerge = response.data;
    // Process candidate data
    const candidateDataAfterUpdate = updateStatus(candidateDataBeforeMerge);
    const candidateData = mergeSteps(candidateDataAfterUpdate);
    const positionUid = candidateData.position_uid;
    const positionName = await getPositionName(positionUid);
    candidateData.position_name = positionName;

    // Send the candidate information as a JSON response
    res.json(candidateData);

  } catch (error) {
    // Handle errors, such as UID not found or API request failure
    res.status(404).json({ error: "Candidate not found" });
  }
});

// Schedule tasks
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
        const customFieldsIsEmpty =
          Object.keys(candidate.custom_fields).length === 0;
        if (customFieldsIsEmpty) {
          //'custom_fields' === null (new candidate with no url)
          console.log(
            `Candidate with UID ${candidate.uid} has a null portalUrl. Updating portalUrl...`
          );
          try {
            await axios.patch(
              `https://api.comeet.co/candidates/${candidate.uid}`,
              JSON.stringify({
                updated_by: {
                  type: "app",
                  name: "WSC-combine",
                },
                custom_fields: {
                  portalUrl: `http://localhost:3000/${encrypt(candidate.uid)}`,
                },
              }),
              {
                headers: {
                  "Content-Type": "application/json", // Set content type to JSON
                  Authorization: `Bearer ${ComeetApiToken}`,
                },
              }
            );
            console.log(`portalURL updated for candidate ${candidate.uid}`);
          } catch (error) {
            console.error(
              `Error updating portalURL for candidate ${candidate.uid}: ${error.message}`
            );
         }
        }
      }
    }
  } catch (error) {
    console.error("Error fetching candidate list:", error);
  }
});

cron.schedule('*/5 * * * *', async () => {
// async function x() {
  console.log('starting check')
  const refferalCandidates = await getAllRefferalCandidates()
  // console.log(refferalCandidates)
  const notificationAudit = await getNotificationAudit()
  // console.log(notificationAudit)
  const candidateToTofity = filterCandidatesToNotify(notificationAudit, refferalCandidates)
  // console.log(candidateToTofity)
  for (const candidate of candidateToTofity) {
    await notifyAndAudit(candidate)
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
