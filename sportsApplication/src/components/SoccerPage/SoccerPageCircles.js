import React from "react";

function SoccerPageCircles({ data, selectedPlayerIndex, handleCircleClick }) {
  return (
      <div className="inner-container">
        <div className="scroll-row row1">
          {data.steps.map((step, index) => (
            <div className="col1" key={index}>
              <div
                className={`circular ${
                  index === selectedPlayerIndex ? "chosen" : "unchosen"
                }`}
                onClick={() => handleCircleClick(index)}
                style={{
                  borderColor:
                    step.status === "completed"
                      ? "#C7D79E"
                      : step.status === "future"
                      ? "#91D9D2"
                      : "#2F3337",
                }}
              >
                <span className="ball_num">{index + 1}</span>
              </div>
              <div className="step-name">{step.name}</div> {/* Add this line */}
            </div>
          ))}
        </div>
      </div>
  );
}

export default SoccerPageCircles;
