import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppData } from "./ApiData.js";
import soccerMatch from "../soccer_field_framee.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "../App.css";
import "../AppHamburger.css";
import "../PopUp.css";

function SoccerPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useAppData(id);

  const [isPopUpVisible, setPopUpVisible] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  const numOfPlayers = data ? data.steps.length - 5 : 0;

  const togglePopUp = (i) => {
    const togglePopUpInter = () => {
      const player = data.steps[i];
      console.log(player);
      setPopUpVisible(!isPopUpVisible);
      // if (player.status == 'current')
      // {
      //   setPopUpVisible(!isPopUpVisible);
      //   console.log("hey")
      // }
    };
    return togglePopUpInter;
  };

  const renderPlayers = (num) => {
    const players = [];

    for (let i = 0; i < num; i++) {
      const player = data.steps[i];
      const photo = require(`../players/Soccer_player${i + 1}.png`);
      players.push(
        <div className={`player-container`} key={i}>
          <img
            className={`overlay-image_${i + 1}`}
            src={photo}
            alt={`soccer-player${i + 1}`}
            width="100%"
            onClick={togglePopUp(i)}
          />
          {isPopUpVisible && (
            <div className="PopUp">
              <Button
                className="close-button btn btn-secondary"
                type="button"
                onClick={togglePopUp(i)}
              >
                X
              </Button>
              <h1>Interview information</h1>
              <div>
                <h2>What to expect?</h2>
                <p>{player.name}</p>
                <h2>When is the interview?</h2>
                {player.time_scheduled ? (
                  <div>
                    <p>
                      Date:{" "}
                      {new Date(player.time_scheduled).toLocaleDateString()}
                    </p>
                    <p>
                      Time:{" "}
                      {new Date(player.time_scheduled).toLocaleTimeString()}
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
                    {assignee.first_name} {assignee.last_name} <br />{" "}
                    Interviewer email: ({assignee.email})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    }
    return players;
  };
  return (
    <div>
      <img
        className="soccer-field"
        src={soccerMatch}
        alt="soccer"
        width="100%"
      />
      {renderPlayers(numOfPlayers)}
    </div>
  );
}

export default SoccerPage;
