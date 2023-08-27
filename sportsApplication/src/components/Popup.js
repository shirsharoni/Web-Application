import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppData } from "./ApiData.js";
import soccerMatch from "../soccer_field_framee.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "../App.css";

function PopUp() {
  const { id } = useParams();
  const { data, error, isLoading } = useAppData(id);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  const player = data.steps[i];
  return (
    <div>
      <h1>Interview information</h1>
      <h2>What to expect?</h2>
      <div>
        <p>{player.name}</p>
      </div>
      <h2>When is the interview?</h2>
      <div>
        {player.time_scheduled ? (
          <div>
            <p>
              Date: {new Date(player.time_scheduled).toLocaleDateString()}
              Time: {new Date(player.time_scheduled).toLocaleTimeString()}
            </p>
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
export default PopUp;
