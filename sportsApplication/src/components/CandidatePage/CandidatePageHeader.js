import React from "react";

function CandidatePageHeader({ data }) {
  return (
    <div>
      <div id="h1-soccer">{data.position_name}</div>
      <div id="h2">
        {data.first_name} {data.last_name}
      </div>
    </div>
  );
}

export default CandidatePageHeader;
