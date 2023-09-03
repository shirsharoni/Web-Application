// helpers.js

export function getCurrentStepName(steps) {
  // Iterate through the steps to find the step with status "current"
  const currentStep = steps.find((step) => step.status === "current");

  // Check if a current step was found
  if (currentStep) {
    return currentStep.name; // Return the name of the current step
  } else {
    return "No current step"; // If no current step is found
  }
}

export function getCurrentStepAssignees(steps) {
  const currentStep = steps.find((step) => step.status === "current");

  if (currentStep) {
    const assignees = currentStep.assignees.map((assignee) => {
      return `${assignee.first_name} ${assignee.last_name}`;
    });

    return assignees.join(", "); // Join the assignees with commas
  } else {
    return "No current step";
  }
}

export function getCurrentStepAssigneesAndTimeScheduled(steps) {
  const currentStep = steps.find((step) => step.status === "current");

  if (currentStep) {
    const assignees = currentStep.assignees.map((assignee) => {
      return `${assignee.first_name} ${assignee.last_name} (${assignee.email})`;
    });

    const timeScheduled = currentStep.time_scheduled || "Not scheduled yet";

    return {
      assignees: assignees.join(", "),
      timeScheduled: timeScheduled,
    };
  } else {
    return {
      assignees: "No current step",
      timeScheduled: "No current step",
    };
  }
}

export function formatTime(isoTimeString) {
  const date = new Date(isoTimeString);

  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Set to false to force 24-hour format
  };

  return date.toLocaleDateString("en-US", options);
}
