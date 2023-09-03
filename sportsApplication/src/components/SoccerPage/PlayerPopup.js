import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import DarkMode from "../toggle/DarkMode";

export function PlayerPopup({ togglePopUp, player }) {
  return (
    <Modal show={true} onHide={togglePopUp} centered>
      <Modal.Header closeButton>
        <Modal.Title>Interview Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>For which position?</h2>
        {/* <p>{player.position_name}</p> */}
        <h2>With whom?</h2>
        <ul>
          {player.assignees.map((assignee, index) => (
            <li key={index}>
              {assignee.first_name} {assignee.last_name} <br /> Interviewer
              email: ({assignee.email})
            </li>
          ))}
        </ul>
        <h2>When is the interview?</h2>
        {player.time_scheduled ? (
          <div>
            <p>Date: {new Date(player.time_scheduled).toLocaleDateString()}</p>
            <p>Time: {new Date(player.time_scheduled).toLocaleTimeString()}</p>
          </div>
        ) : (
          <p>Not scheduled yet</p>
        )}
        <h2>What to expect?</h2>
        <p>{player.name}</p>
        <a
          href="https://goo.gl/maps/wGh5ppSvMwv4Vudo8"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-link"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            bottom: "20px",
            right: "20px",
          }}
        >
          <span style={{ padding: ".25rem .5rem", fontSize: "1.75rem" }}>
            <i className="fa-solid fa-map-pin"></i>
          </span>
        </a>
        <a
          href="https://www.waze.com/live-map/directions/il/tel-aviv-district/%D7%A8%D7%92/wsc-sports?to=place.ChIJt0QWvcBLHRURRiGcBtZacYs&from=ll.32.0863353%2C34.8049162&utm_medium=lm_share_directions&utm_campaign=default&utm_source=waze_website"
          target="_blank"
          className="btn btn-link"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            bottom: "20px",
            right: "80px",
          }}
        >
          <span style={{ padding: ".25rem .5rem", fontSize: "1.75rem" }}>
            <i className="fab fa-waze"></i>
          </span>
        </a>
      </Modal.Body>
      <DarkMode />
    </Modal>
  );
}
