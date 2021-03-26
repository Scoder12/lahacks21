import React from "react";

const Challenge = () => {
  return (
    <div className="challenge">
      <div className="cont">
        <h1>Challenge of the Month</h1>
        <p>Develop a project that helps tackle the following issue:</p>
      </div>
      <img src={"/challenge.jpg"} alt="Challenge of the Month" />
      <h2>Clean up microplastics in the ocean</h2>
    </div>
  );
};

export default Challenge;
