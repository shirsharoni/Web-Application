// SoccerPage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppData } from "../ApiData.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import "../../PopUp.css";
import "./SoccerPage.css";
import HomeNavbar from "../navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DarkMode from "../toggle/DarkMode.js";
import { getStepAssignees, formatTime } from "./helpers";
import SoccerPageHeader from "./SoccerPageHeader";
import SoccerPageCircles from "./SoccerPageCircles";
import SoccerPageInfo from "./SoccerPageInfo";

function SoccerPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useAppData(id);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#F46F01");
  const handleToggleTheme = (isDarkMode) => {
    setBackgroundColor(isDarkMode ? "#6DB926" : "#F46F01");
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  // Find the index of the step with the current status and set it as the default selected step.
  const currentIndex = data.steps.findIndex(
    (step) => step.status === "current"
  );
  if (selectedPlayerIndex === null) {
    setSelectedPlayerIndex(currentIndex);
  }
  function handleCircleClick(index) {
    setSelectedPlayerIndex(index); // Update selected player index when a circle is clicked
  }
  return (
    <>
      <div className="soccerPageContainer" style={{ backgroundColor }}>
        <HomeNavbar onToggleTheme={handleToggleTheme} showToggle={true} />
        <div className="container container-soccer d-flex flex-column vh-100">

          <SoccerPageHeader data={data} />
          <SoccerPageCircles
            data={data}
            selectedPlayerIndex={selectedPlayerIndex}
            handleCircleClick={handleCircleClick}
          />
          <SoccerPageInfo
            data={data}
            selectedPlayerIndex={selectedPlayerIndex}
          />
        </div>
      </div>
    </>
  );
}

export default SoccerPage;
