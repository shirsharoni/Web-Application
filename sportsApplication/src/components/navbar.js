import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import DarkMode from "./toggle/DarkMode";
import "./toggle/DarkMode.css";

import basketSvg from "../basketball.svg";
import soccerSvg from "../soccer.svg";

function HomeNavbar({ onToggleTheme }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBasketballActive, setIsBasketballActive] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setIsBasketballActive(!isBasketballActive);
    onToggleTheme(!isDarkMode);
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        {/* <div className={`dark_mode ${isDarkMode ? "lightgreen" : "beige"}`}>
          <input
            className="dark_mode_input"
            type="checkbox"
            id="darkmode-toggle"
            checked={isDarkMode}
            onChange={toggleTheme}
          />
          <label className="dark_mode_label" htmlFor="darkmode-toggle">
            <div className="circle">
              <div
                className={`icon ${isBasketballActive ? "left" : "right"}`}
                style={{
                  left: isBasketballActive ? "0" : "53%", // Adjust the left position
                  transition: "left 0.19s ease-in-out", // Add a transition
                }}
              >
                {isBasketballActive && (
                  <img
                    className="basketball"
                    src={basketSvg}
                    alt="Basketball"
                  />
                )}
                {!isBasketballActive && (
                  <img className="soccer" src={soccerSvg} alt="Soccer" />
                )}
              </div>
            </div>
          </label>
        </div> */}
        <Container>
          <Navbar.Brand href="https://wsc-sports.com/" target="_blank">
            <img
              alt=""
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            WSC Sports
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              href="https://www.linkedin.com/company/wsc-sports-technologies/"
              target="_blank"
            >
              <span style={{ color: "white" }}>
                <i aria-hidden="true" class="fab fa-linkedin"></i>
              </span>
            </Nav.Link>
            <Nav.Link href="https://twitter.com/wsc_sports" target="_blank">
              <span class="elementor-icon-list-icon" style={{ color: "white" }}>
                <i aria-hidden="true" class="fab fa-twitter"></i>
              </span>
            </Nav.Link>
            <Nav.Link
              href="https://www.instagram.com/wsc_sports/"
              target="_blank"
            >
              <span class="elementor-icon-list-icon" style={{ color: "white" }}>
                <i aria-hidden="true" class="fab fa-instagram"></i>
              </span>
            </Nav.Link>
            <Nav.Link
              href="https://www.facebook.com/WSC.SportsTechnologies/"
              target="_blank"
            >
              <span class="elementor-icon-list-icon" style={{ color: "white" }}>
                <i aria-hidden="true" class="fab fa-facebook"></i>
              </span>
            </Nav.Link>
            <Nav.Link
              href="https://sports-content-kings.simplecast.com/"
              target="_blank"
            >
              <span class="elementor-icon-list-icon" style={{ color: "white" }}>
                <i aria-hidden="true" class="fas fa-microphone-alt"></i>
              </span>
            </Nav.Link>
          </Nav>
          {/* <DarkMode onToggleTheme={toggleTheme} /> */}
          <div className={`dark_mode ${isDarkMode ? "lightgreen" : "beige"}`}>
            <input
              className="dark_mode_input"
              type="checkbox"
              id="darkmode-toggle"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            <label className="dark_mode_label" htmlFor="darkmode-toggle">
              <div className="circle">
                <div
                  className={`icon ${isBasketballActive ? "left" : "right"}`}
                  style={{
                    left: isBasketballActive ? "0" : "53%", // Adjust the left position
                    transition: "left 0.19s ease-in-out", // Add a transition
                  }}
                >
                  {isBasketballActive && (
                    <img
                      className="basketball"
                      src={basketSvg}
                      alt="Basketball"
                    />
                  )}
                  {!isBasketballActive && (
                    <img className="soccer" src={soccerSvg} alt="Soccer" />
                  )}
                </div>
              </div>
            </label>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default HomeNavbar;
