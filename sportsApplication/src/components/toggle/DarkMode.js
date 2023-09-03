// DarkMode.js
import React, { useState } from "react";
import "./DarkMode.css";

const DarkMode = ({ onToggleTheme }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
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
        {/* You can add your sun/moon icons here */}
      </label>
    </div>
  );
};

export default DarkMode;
