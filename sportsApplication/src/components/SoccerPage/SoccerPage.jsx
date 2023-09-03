import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppData } from "../ApiData.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import "../../AppHamburger.css";
import "../../PopUp.css";
import "./SoccerPage.css";
import { PlayerPopup } from "./PlayerPopup.js";
// import DarkMode from "../toggle/DarkMode.js";
import HomeNavbar from "../navbar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';


function getCurrentStepName(steps) {
  // Iterate through the steps to find the step with status "current"
  const currentStep = steps.find((step) => step.status === "current");

  // Check if a current step was found
  if (currentStep) {
    return currentStep.name; // Return the name of the current step
  } else {
    return "No current step"; // If no current step is found
  }
}

function getCurrentStepAssignees(steps) {
  const currentStep = steps.find((step) => step.status === "current");

  if (currentStep) {
    const assignees = currentStep.assignees.map((assignee) => {
      return `${assignee.first_name} ${assignee.last_name}`;
    });

    return assignees.join(', '); // Join the assignees with commas
  } else {
    return "No current step";
  }
}

function getCurrentStepAssigneesAndTimeScheduled(steps) {
  const currentStep = steps.find((step) => step.status === "current");

  if (currentStep) {
    const assignees = currentStep.assignees.map((assignee) => {
      return `${assignee.first_name} ${assignee.last_name} (${assignee.email})`;
    });

    const timeScheduled = currentStep.time_scheduled || "Not scheduled yet";

    return {
      assignees: assignees.join(', '),
      timeScheduled: timeScheduled
    };
  } else {
    return {
      assignees: "No current step",
      timeScheduled: "No current step"
    };
  }
}

function formatTime(isoTimeString) {
  const date = new Date(isoTimeString);

  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Set to false to force 24-hour format
  };

  return date.toLocaleDateString('en-US', options);
}


function SoccerPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useAppData(id);

  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [popupId, setPopUpId] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  const numOfPlayers = data ? data.steps.length : 0;

  const togglePopUp = (i) => {
    setPopUpVisible(!isPopUpVisible);
    setPopUpId(i);
  };

  const renderPlayers = (num) => {
    const players = [];

    for (let i = 0; i < num; i++) {
      const player = data.steps[i];
      players.push(
        <div className={`player-container`} key={i}>
          <img
            className={`overlay-image_${i + 1}`}
            src={`/soccer-players/Soccer_player${i + 1}.png`}
            alt={`soccer-player${i + 1}`}
            width="100%"
            onClick={() => togglePopUp(i)}
          />
          {isPopUpVisible && i === popupId && (
            <PlayerPopup togglePopUp={() => togglePopUp(i)} player={player} />
          )}
        </div>
      );
    }
    return players;
  };


  function generateCirclesWithSteps(steps) {
    return steps.map((step, index) => (
      <Col key={index}>
        <div
          className={`circular`}
          onClick={() => handleCircleClick(index)}
        >
          <span className="ball_num">{index + 1}</span>
        </div>
      </Col>
    ));
  }
  

  function handleCircleClick(index) {
    // You can access the corresponding step using the 'index' parameter
    const selectedStep = data.steps[index];
    // Do something with the selected step, e.g., display its details
    console.log(`Clicked on circle ${index + 1}, step details:`, selectedStep);
  }
  

  return (
    <>
    <div className="soccerPageContainer">
    <HomeNavbar />
        <div class="container container-soccer d-flex flex-column vh-100">
          <div id="h1">{data.position_name}</div>
          <div id="h2">{data.first_name} {" "} {data.last_name}</div>
          
          <Container fluid="true" className="inner-container">
            <Row>
              {generateCirclesWithSteps(data.steps)}
            </Row>
          </Container>
        
          {/* <div class="inner-container"> */}
  
            {/* <Container className="soccer-comtainer"> */}
              {/* <div id="soccer-page"> */}
                {/* {renderPlayers(numOfPlayers)} */}
              {/* </div> */}
            {/* </Container> */}
          {/* </div> */}

          {/* </Container> */}
          <div>
           <div id="p"> <span class="interview_header">Current Step:</span> {" "} {getCurrentStepName(data.steps)} <br />
           <span class="interview_header">Interviewers:</span> {" "} {getCurrentStepAssignees(data.steps)} <br />
           <span class="interview_header">Time Scheduled:</span> {formatTime(getCurrentStepAssigneesAndTimeScheduled(data.steps).timeScheduled)}

            </div>
           
          </div>
        </div>
    </div>
    </>
  )
}

export default SoccerPage;
