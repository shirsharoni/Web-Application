import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppData } from "../ApiData.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
// import "../../AppHamburger.css";
import "../../PopUp.css";
import "./SoccerPage.css";
import { PlayerPopup } from "./PlayerPopup.js";
import HomeNavbar from "../navbar";
import DarkMode from "../toggle/DarkMode.js";

// Import the helper functions from helpers.js
import {
  getCurrentStepName,
  getCurrentStepAssignees,
  getCurrentStepAssigneesAndTimeScheduled,
  formatTime,
} from "./helpers";

function SoccerPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useAppData(id);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [popupId, setPopUpId] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("orange"); // Add background color state

  const handleToggleTheme = (isDarkMode) => {
    // Update the background color based on the theme
    setBackgroundColor(isDarkMode ? "black" : "orange");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  const numOfPlayers = data ? data.steps.length : 0;

  // const togglePopUp = (i) => {
  //   setPopUpVisible(!isPopUpVisible);
  //   setPopUpId(i);
  // };

  // const renderPlayers = (num) => {
  //   const players = [];

  //   for (let i = 0; i < num; i++) {
  //     const player = data.steps[i];
  //     players.push(
  //       <div className={`player-container`} key={i}>
  //         <img
  //           className={`overlay-image_${i + 1}`}
  //           src={`/soccer-players/Soccer_player${i + 1}.png`}
  //           alt={`soccer-player${i + 1}`}
  //           width="100%"
  //           onClick={() => togglePopUp(i)}
  //         />
  //         {isPopUpVisible && i === popupId && (
  //           <PlayerPopup togglePopUp={() => togglePopUp(i)} player={player} />
  //         )}
  //       </div>
  //     );
  //   }
  //   return players;
  // };
  return (
    <>
      <div className="soccerPageContainer" style={{ backgroundColor }}>
        <HomeNavbar />
        <div class="container container-soccer d-flex flex-column vh-100">
          <div id="h1">{data.position_name}</div>
          <div id="h2">
            {data.first_name} {data.last_name}
          </div>
          <div class="inner-container">
            <div class="circular"></div>

            {/* <Container className="soccer-comtainer"> */}
            {/* <div id="soccer-page"> */}
            {/* {renderPlayers(numOfPlayers)} */}
            {/* </div> */}
            {/* </Container> */}
          </div>
          <div>
            <div id="p">
              {" "}
              <span class="interview_header">Current Step:</span>{" "}
              {getCurrentStepName(data.steps)} <br />
              <span class="interview_header">Interviewers:</span>{" "}
              {getCurrentStepAssignees(data.steps)} <br />
              <span class="interview_header">Time Scheduled:</span>{" "}
              {formatTime(
                getCurrentStepAssigneesAndTimeScheduled(data.steps)
                  .timeScheduled
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SoccerPage;
