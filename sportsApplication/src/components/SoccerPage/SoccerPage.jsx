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

function SoccerPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useAppData(id);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);

  const [backgroundColor, setBackgroundColor] = useState("#f46f01");

  const handleToggleTheme = (isDarkMode) => {
    setBackgroundColor(isDarkMode ? "#6db926" : "#f46f01");
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
          <div id="h1-soccer">{data.position_name}</div>
          <div id="h2">{data.first_name} {data.last_name}</div>

          {/* <div className="outer-container"> */}
            <div className="inner-container">
              <div className="scroll-row row1">
                {data.steps.map((step, index) => (
                  <div className="col1" key={index}>
                    <div
                      className={`circular`}
                      onClick={() => handleCircleClick(index)}
                    >
                      <span className="ball_num">{index + 1}</span>
                    </div>
                    <div className="step-name">{step.name}</div> {/* Add this line */}
                  </div>
                ))}
              </div>
            </div>
          {/* </div> */}

          {selectedPlayerIndex !== null && (
            <Container fluid="true" className="container-interview">
              <Row>
                <Col>
                  <div className="interview-info">
                    <img
                      alt=""
                      src={"/Layout/footsteps.png"}
                      width="30"
                      height="30"
                    />
                    <span className="step-header">Current Step:</span>
                    {data.steps[selectedPlayerIndex].name} <br />
                    <span className="step-icon">
                      <img
                        alt=""
                        src={"/Layout/clock.png"}
                        width="30"
                        height="30"
                      />
                      <span className="step-header">When?</span> 

                      {data.steps[selectedPlayerIndex].time_scheduled ? (
                        <div className="text-container">
                          <span id="p-interview date">
                            {new Date(
                              data.steps[selectedPlayerIndex].time_scheduled
                            ).toLocaleString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                              timeZoneName: "short",
                            })}
                          </span>
                        </div>
                      ) : (
                        <span className="p-interview">Not scheduled yet</span>
                      )}
                    </span>
                    <br />
                    <span className="step-header">
                      <img
                        alt=""
                        src={"/Layout/interview.png"}
                        width="30"
                        height="30"
                      />
                      With whom?
                    </span>
                    {getStepAssignees(data.steps[selectedPlayerIndex])} <br />
                    <div className="where">
                      <span className="step-header">
                        <img
                          alt=""
                          src={"/Layout/location.png"}
                          width="30"
                          height="30"
                        />
                        Where?
                      </span>
                      {data.steps[selectedPlayerIndex].type ===
                        "Phone Interview" && (
                        <span className="p-interview"> Phone call </span>
                      )}
                      {data.steps[selectedPlayerIndex].type ===
                        "Video Interview" && (
                        <span className="p-interview">Zoom</span>
                      )}
                      {data.steps[selectedPlayerIndex].type !==
                        "Phone Interview" &&
                        data.steps[selectedPlayerIndex].type !==
                          "Video Interview" && (
                          <div>
                            <a
                              href="https://goo.gl/maps/wGh5ppSvMwv4Vudo8"
                              target="_blank"
                            >
                              <span
                                style={{
                                  padding: ".20rem .5rem",
                                  fontSize: "1.75rem",
                                }}
                              >
                                <button type="button" className="btn btn-link">
                                  <i className="fa-solid fa-map-pin"></i>
                                </button>
                              </span>
                            </a>
                            <a
                              href="https://www.waze.com/live-map/directions/il/tel-aviv-district/%D7%A8%D7%92/wsc-sports?to=place.ChIJt0QWvcBLHRURRiGcBtZacYs&from=ll.32.0863353%2C34.8049162&utm_medium=lm_share_directions&utm_campaign=default&utm_source=waze_website"
                              target="_blank"
                            >
                              <span
                                style={{
                                  padding: ".20rem .5rem",
                                  fontSize: "1.75rem",
                                }}
                              >
                                <button type="button" className="btn btn-link">
                                  <i className="fab fa-waze"></i>
                                </button>
                              </span>
                            </a>
                          </div>
                        )}
                    </div>
                  </div>
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
