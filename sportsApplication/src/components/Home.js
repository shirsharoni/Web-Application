import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import soccer from "../soccer.svg";
import basketball from "../basketball.svg";
// import hamburger from "../hamburger/hamburger.png";
import "../App.css";
// import "../AppHamburger.css";
import { useAppData } from "./ApiData.js";
import HomeNavbar from "./navbar";
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
      <HomeNavbar />
      <header className="App-header">
        <h1 className="MainHeader">
          Hey {data.first_name}!<br />
          Are you ready to join our team?
        </h1>
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
