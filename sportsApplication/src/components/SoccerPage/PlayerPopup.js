import { Button } from "react-bootstrap";

export function PlayerPopup({ togglePopUp, player }) {
  return (
    <div className="PopUp">
      <Button
        className="close-button btn btn-secondary"
        type="button"
        onClick={togglePopUp}
        border-radius="45%"
      >
        <div>x</div>
      </Button>
      <h1>Interview information</h1>
      <div>
        <h2>What to expect?</h2>
        <p>{player.name}</p>
        <h2>When is the interview?</h2>
        {player.time_scheduled ? (
          <div>
            <p>Date: {new Date(player.time_scheduled).toLocaleDateString()}</p>
            <p>Time: {new Date(player.time_scheduled).toLocaleTimeString()}</p>
          </div>
        ) : (
          <p>Not scheduled yet</p>
        )}
      </div>
      <h2>Who are the interviewers?</h2>
      <ul>
        {player.assignees.map((assignee, index) => (
          <li key={index}>
            {assignee.first_name} {assignee.last_name} <br /> Interviewer email:
            ({assignee.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
