import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import soccer from "../soccer.svg";
import basketball from "../basketball.svg";
import hamburger from "../hamburger/hamburger.png";
import "../App.css";
import "../AppHamburger.css";
// import './ApiData.js'
import { useAppData } from "./ApiData.js";
const fontAwesomeScript = document.createElement("script");
fontAwesomeScript.src = "https://kit.fontawesome.com/62897f86fd.js";
fontAwesomeScript.crossOrigin = "anonymous";
document.head.appendChild(fontAwesomeScript);
function App() {
  const { id } = useParams();
  const { data, error, isLoading } = useAppData();
  function goToSoccer() {
    console.log("go to soccer");
    window.location = `/soccer/${id}`;
  }
  function goToBasketball() {
    console.log("go to basketball");
    window.location = `/basketball/${id}`;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hey {data.first_name}!<br />
          are you good enough to join our team?
        </p>
        <img src={hamburger} className="App-hamburger" alt="hamburger" />
        <ul>
          <li className="linkList" id="note1">
            <a
              href="https://www.linkedin.com/company/wsc-sports-technologies/"
              target="_blank"
            >
              <span style={{ color: "white" }}>
                <i aria-hidden="true" class="fab fa-linkedin"></i>
              </span>
            </a>
          </li>
          <li className="linkList" id="note2">
            <a href="https://twitter.com/wsc_sports" target="_blank">
              <span class="elementor-icon-list-icon" style={{ color: "white" }}>
                <i aria-hidden="true" class="fab fa-twitter"></i>
              </span>
            </a>
          </li>
          <li className="linkList" id="note3">
            <a href="https://www.instagram.com/wsc_sports/" target="_blank">
              <span class="elementor-icon-list-icon" style={{ color: "white" }}>
                <i aria-hidden="true" class="fab fa-instagram"></i>
              </span>
            </a>
          </li>
          <li className="linkList" id="note4">
            <a
              href="https://www.facebook.com/WSC.SportsTechnologies/"
              target="_blank"
            >
              <span class="elementor-icon-list-icon" style={{ color: "white" }}>
                <i aria-hidden="true" class="fab fa-facebook"></i>
              </span>
            </a>
          </li>
          <li className="linkList" id="note5">
            <a
              href="https://sports-content-kings.simplecast.com/"
              target="_blank"
            >
              <span class="elementor-icon-list-icon" style={{ color: "white" }}>
                <i aria-hidden="true" class="fas fa-microphone-alt"></i>
              </span>
            </a>
          </li>
        </ul>
        <div class="horizontal">
          <div class="vertical">
            <img src={soccer} className="App-logo" alt="logo" />
            <Button onClick={goToSoccer}>Let's play soccer</Button>
          </div>
          <div class="vertical">
            <img src={basketball} className="App-logo" alt="logo" />
            <Button onClick={goToBasketball}>Let's play Basketball</Button>
          </div>
        </div>
      </header>
    </div>
  );
}
export default App;
