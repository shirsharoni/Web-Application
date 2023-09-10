import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./components/Home";
import SoccerPage from "./components/SoccerPage/SoccerPage";
import BasketballPage from "./components/BasketballPage";
import "./components/ApiData.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

const App = () => {
  let routes = useRoutes([
    { path: "/:id", element: <Home /> },
    { path: "/CadidateDetails/:id", element: <SoccerPage /> },
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
