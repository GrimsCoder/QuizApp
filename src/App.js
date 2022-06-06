import React from "react";

import Start from "./Start";
import Quiz from "./Quiz";

export default function App() {
  const [start, setStart] = React.useState(false);
  function startQuiz() {
    setStart(true);
  }
  return <main>{!start ? <Start setStart={setStart} /> : <Quiz />}</main>;
}
