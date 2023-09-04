import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppData } from "../ApiData.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import "../../AppHamburger.css";
import "../../PopUp.css";
import "./SoccerPage.css";
import HomeNavbar from "../navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DarkMode from "../toggle/DarkMode.js";

function SoccerPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useAppData(id);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("orange");

  const handleToggleTheme = (isDarkMode) => {
    setBackgroundColor(isDarkMode ? "lightgreen" : "orange");
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
        <HomeNavbar onToggleTheme={handleToggleTheme} />
        <div className="container container-soccer d-flex flex-column vh-100">
          <div id="h1">{data.position_name}</div>
          <div id="h2">
            {data.first_name} {data.last_name}
          </div>

          <Container fluid="true" className="inner-container">
            <Row>
              {data.steps.map((step, index) => (
                <Col key={index}>
                  <div
                    className={`circular`}
                    onClick={() => handleCircleClick(index)}
                  >
                    <span className="ball_num">{index + 1}</span>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>

          {/* Player details container */}
          {selectedPlayerIndex !== null && (
            <Container fluid="true" className="container-soccer">
              <Row>
                <Col>
                  <h1>Interview information</h1>
                  <div>
                    <h2>What to expect?</h2>
                    <p>{data.steps[selectedPlayerIndex].name}</p>
                    <h2>When is the interview?</h2>
                    {data.steps[selectedPlayerIndex].time_scheduled ? (
                      <div>
                        <p>
                          Date:{" "}
                          {new Date(
                            data.steps[selectedPlayerIndex].time_scheduled
                          ).toLocaleDateString()}
                        </p>
                        <p>
                          Time:{" "}
                          {new Date(
                            data.steps[selectedPlayerIndex].time_scheduled
                          ).toLocaleTimeString()}
                        </p>
                      </div>
                    ) : (
                      <p>Not scheduled yet</p>
                    )}
                  </div>
                  <h2>Who are the interviewers?</h2>
                  <ul>
                    {data.steps[selectedPlayerIndex].assignees.map(
                      (assignee, index) => (
                        <li key={index}>
                          {assignee.first_name} {assignee.last_name} <br />{" "}
                          Interviewer email: ({assignee.email})
                        </li>
                      )
                    )}
                  </ul>
                </Col>
              </Row>
            </Container>
          )}
        </div>
      </div>
    </>
  );
}

export default SoccerPage;
