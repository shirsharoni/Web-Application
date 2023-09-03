import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppData } from "../ApiData.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import "../../AppHamburger.css";
import "../../PopUp.css";
import "./SoccerPage.css";
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
  const [backgroundColor, setBackgroundColor] = useState("beige"); // Add background color state

  const handleToggleTheme = (isDarkMode) => {
    // Update the background color based on the theme
    setBackgroundColor(isDarkMode ? "lightgreen" : "beige");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  const numOfPlayers = data ? data.steps.length : 0;
  return (
    <>
      <div className="soccerPageContainer" style={{ backgroundColor }}>
        <HomeNavbar />
        <DarkMode onToggleTheme={handleToggleTheme} />
        <div className="container container-soccer d-flex flex-column vh-100">
          <div id="h1">{data.position_name}</div>
          <div id="h2">
            {data.first_name} {data.last_name}
          </div>
          <div className="inner-container">
            <div className="circular"></div>
          </div>
          <div>
            <div id="p">
              {" "}
              <span className="interview_header">Current Step:</span>{" "}
              {getCurrentStepName(data.steps)} <br />
              <span className="interview_header">Interviewers:</span>{" "}
              {getCurrentStepAssignees(data.steps)} <br />
              <span className="interview_header">Time Scheduled:</span>{" "}
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
