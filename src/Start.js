import React from "react";
import Video from "./videostuff.mp4";

export default function Start(props) {
  return (
    <main className="main-start">
      <video className="videoTag" autoPlay loop muted>
        <source src={Video} type="video/mp4" />
      </video>
      <h1>Quizzical</h1>
      <p>A fun Quiz</p>
      <button onClick={props.setStart} className="start-button">
        Start Quiz{" "}
      </button>
    </main>
  );
}
