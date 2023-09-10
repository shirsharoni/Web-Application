import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import "../../PopUp.css";
import "./SoccerPage.css";
import HomeNavbar from "../navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getStepAssignees } from "./helpers";

function SoccerPageInfo({ data, selectedPlayerIndex }) {
  const currentStep = data.steps[selectedPlayerIndex];
  const isPhoneInterview = currentStep.type === "Phone Interview";
  const isVideoInterview = currentStep.type === "Video Interview";

  return (
    selectedPlayerIndex !== null && (
      <Container fluid className="container-interview">
        <Row>
          <Col>
            <div className="interview-info">
              <img alt="" src="/Layout/footsteps.png" width="30" height="30" />
              <span className="step-header">Step details:</span>{" "}
              {currentStep.name} <br />
              <span className="step-icon">
                <img alt="" src="/Layout/clock.png" width="30" height="30" />
                <span className="step-header">When?</span>
                {currentStep.time_scheduled ? (
                  <div className="text-container">
                    <span id="p-interview date">
                      {new Date(currentStep.time_scheduled).toLocaleString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                          timeZoneName: "short",
                        }
                      )}
                    </span>
                  </div>
                ) : (
                  <span className="p-interview"> Not scheduled yet</span>
                )}
              </span>
              <br />
              <span className="step-header">
                <img
                  alt=""
                  src="/Layout/interview.png"
                  width="30"
                  height="30"
                />
                With whom?
              </span>{" "}
              {getStepAssignees(currentStep)} <br />
              <div className="where">
                <span className="step-header">
                  <img
                    alt=""
                    src="/Layout/location.png"
                    width="30"
                    height="30"
                  />
                  Where?
                </span>{" "}
                {isPhoneInterview && (
                  <span className="p-interview" style={{ padding: "5px" }}>
                    Phone call
                  </span>
                )}
                {isVideoInterview && <span className="p-interview">Zoom</span>}
                {!isPhoneInterview && !isVideoInterview && (
                  <div>
                    <a
                      href="https://goo.gl/maps/wGh5ppSvMwv4Vudo8"
                      target="_blank"
                    >
                      <span
                        style={{ padding: ".20rem .5rem", fontSize: "1.75rem" }}
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
                        style={{ padding: ".20rem .5rem", fontSize: "1.75rem" }}
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
    )
  );
}

export default SoccerPageInfo;
