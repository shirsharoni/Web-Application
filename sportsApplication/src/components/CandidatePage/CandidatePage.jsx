// CandidatePage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppData } from "../ApiData.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../HomePage/App.css";
import "./CandidatePage.css";
import HomeNavbar from "../HomePage/navbar";
import CandidatePageHeader from "./CandidatePageHeader";
import CandidatePageCircles from "./CandidatePageCircles";
import CandidatePageInfo from "./CandidatePageInfo";

function CandidatePage() {
  const { id } = useParams();
  const { data, error, isLoading } = useAppData(id);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#F46F01");
  const [isDarkMode, setIsDarkMode] = useState(false); // Define isDarkMode state

  const handleToggleTheme = (isDarkMode) => {
    setBackgroundColor(isDarkMode ? "#6DB926" : "#F46F01");
    setIsDarkMode(isDarkMode); // Update isDarkMode state
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
        <div className="soccerPageContainer-inner">
          <div className="basketball-field-left">
            {isDarkMode ? (
              <img
                className="SF-R"
                alt=""
                src="/Layout/soccerF.png"
                width="170"
                height="170"
              />
            ) : (
              <img
                className="BF-L"
                alt=""
                src="/Layout/basketballF.png"
                width="170"
                height="170"
              />
            )}
          </div>

          <div className="container container-soccer d-flex flex-column vh-100">
            <CandidatePageHeader data={data} />
            <CandidatePageCircles
              data={data}
              selectedPlayerIndex={selectedPlayerIndex}
              handleCircleClick={handleCircleClick}
            />
            <CandidatePageInfo
              data={data}
              selectedPlayerIndex={selectedPlayerIndex}
            />
          </div>
          <div className="basketball-field-right">
            {isDarkMode ? (
              <img
                className="SF-R"
                alt=""
                src="/Layout/soccerF.png"
                width="170"
                height="170"
              />
            ) : (
              <img
                className="BF-R"
                alt=""
                src="/Layout/basketballF.png"
                width="170"
                height="170"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CandidatePage;
