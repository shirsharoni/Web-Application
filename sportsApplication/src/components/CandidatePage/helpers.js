// helpers.js

export function getStepAssignees(step) {
  if (!step || !step.assignees || !Array.isArray(step.assignees)) {
    return ""; // Return an empty string if the input is invalid or no assignees
  }

  const assigneeNames = step.assignees.map(assignee => `${assignee.first_name} ${assignee.last_name}`);
  return assigneeNames.join(", ");
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