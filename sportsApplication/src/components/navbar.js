import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import DarkMode from "./toggle/DarkMode";

function HomeNavbar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
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
          <Nav className="justify-content-end">{/* <DarkMode /> */}</Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default HomeNavbar;
