const Result = ({ score, restartQuiz }) => {
  return (
    <div className="result">
      <h1>🎉 Quiz Finished!</h1>
      <h2>Your Score: {score}</h2>
      <button onClick={restartQuiz}>Play Again</button>
    </div>
  );
};

export default Result;
