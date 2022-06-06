import React from "react";

export default function Quiz() {
  const [quiz, setQuiz] = React.useState([]);
  const [quizSubmit, setQuizSubmit] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [restart, setRestart] = React.useState(false);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        setQuiz(
          data.results.map((quiz) => ({
            ...quiz,
            selectedAnswer: "",
            isAnswer: false,
            value: 0,
            quizDone: false,

            answers: [
              quiz.correct_answer,
              ...quiz.incorrect_answers.map((i) => i),
            ].sort(() => (Math.random() > 0.5 ? 1 : -1)),
          }))
        );
      });
  }, [restart]);

  quiz.forEach((item, i) => {
    item.id = i + 1;
  });

  function submitResults(id) {
    let value = 0;

    let newQuiz = (oldQuiz) =>
      oldQuiz.map((q) => {
        if (q.correct_answer === q.selectedAnswer) {
          value++;
          setTotal(value);
          return { ...q, isAnswer: true };
        } else if (q.selectedAnswer !== q.correct_answer) {
          return { ...q, isAnswer: false };
        } else {
          return q;
        }
      });

    setQuiz(newQuiz);

    setQuizSubmit(true);
  }

  function selectBox(id) {
    setQuiz((oldQuiz) =>
      oldQuiz.map((q) => {
        return q.answers.includes(id) ? { ...q, selectedAnswer: id } : q;
      })
    );
  }

  function correctAnswer(id) {}
  function restartGame() {
    setRestart((prevRestart) => !prevRestart);
    setQuizSubmit(false);
    setTotal(0);
  }

  const quizData = (
    <div>
      {quiz.map((q) => {
        return (
          <div className="quiz" key={q.id}>
            <p dangerouslySetInnerHTML={{ __html: q.question }}></p>

            {q.answers.map((answer, index) => {
              return (
                <button
                  onClick={() => {
                    selectBox(answer);
                    correctAnswer(answer);
                  }}
                  key={answer}
                  className={`quiz-answer 
                       ${
                         q.selectedAnswer === answer ? "blue-btn" : "white-btn"
                       } 
                       ${
                         quizSubmit && q.correct_answer === answer
                           ? "green-btn"
                           : quizSubmit &&
                             q.selectedAnswer === answer &&
                             q.selectedAnswer !== q.correct_answer
                           ? "red-btn"
                           : ""
                       }`}
                  id={index}
                  dangerouslySetInnerHTML={{ __html: answer }}
                ></button>
              );
            })}
            <hr />
          </div>
        );
      })}
      {quizSubmit ? (
        <div className="restart">
          {`You scored: ${total}`}
          <button className="restart-btn" onClick={() => restartGame()}>
            Play Again
          </button>
        </div>
      ) : quiz.length > 1 ? (
        <button className="submit-btn" onClick={() => submitResults()}>
          {" "}
          Submit{" "}
        </button>
      ) : (
        ""
      )}
    </div>
  );

  return <main>{quizData}</main>;
}
