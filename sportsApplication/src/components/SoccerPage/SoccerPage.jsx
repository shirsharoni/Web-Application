import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppData } from "../ApiData.js";
import soccerMatch from "../../soccer_field_framee.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import "../../AppHamburger.css";
import "../../PopUp.css";
import "./SoccerPage.css";
import { PlayerPopup } from "./PlayerPopup.js";

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
  return (
    <>
      <img
        className="soccer-field"
        src={soccerMatch}
        alt="soccer"
        width="100%"
      />
      <div id="soccer-page">{renderPlayers(numOfPlayers)}</div>
    </>
  );
}

export default SoccerPage;
