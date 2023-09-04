import React from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import soccer from "../soccer.svg";
import basketball from "../basketball.svg";
import "../App.css";
import { useAppData } from "./ApiData.js";
import HomeNavbar from "./navbar";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
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
          Are you a Soul Player?
        </h1>
        <Container fluid="true">
          <Row xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
            <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
              <Row xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                <div className="mb-2">
                  <Image src={soccer} className="App-logo" rounded />
                  <br />
                  <Button onClick={goToSoccer} bsPrefix="btn" size="sm">
                    Let's play soccer
                  </Button>
                </div>
              </Row>
            </Col>
            <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
              <Row xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                <div className="mb-2">
                  <Image src={basketball} className="App-logo" rounded />
                  <br />
                  <Button onClick={goToBasketball} size="sm">
                    Let's play Basketball
                  </Button>
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}
export default App;
