import React, { useState } from "react";
import "./DarkMode.css";
// import basketSvg from "/basketball.svg";
// import soccerSvg from "/soccer.svg";

const DarkMode = ({ onToggleTheme }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBasketballActive, setIsBasketballActive] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setIsBasketballActive(!isBasketballActive);
    onToggleTheme(!isDarkMode);
  };

  return (
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
              left: isBasketballActive ? "8" : "62%", // Adjust the left position
              transition: "left 0.19s ease-in-out", // Add a transition
            }}
          >
            {isBasketballActive && (
              <img
                className="basketball"
                src={"/Layout/basketball.svg"}
                alt="Basketball"
              />
            )}
            {!isBasketballActive && (
              <img className="soccer" src={"/Layout/soccer.svg"} alt="Soccer" />
            )}
          </div>
        </div>
      </label>
    </div>
  );
};

export default DarkMode;
