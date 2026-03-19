import React, { useState } from "react";

const Quiz = ({ questions, onFinish, category }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false); // NEW

  if (!questions || questions.length === 0) {
    return (
      <div className="quiz-wrapper">
        <h2>No questions available for this category.</h2>
      </div>
    );
  }

  const handleSelect = (opt) => {
    if (showResult) return; // prevent re-click
    setSelected(opt);
    setShowResult(true);
  };

  const handleNext = () => {
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }

    setSelected("");
    setShowResult(false); // reset for next question

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      onFinish(score + (selected === questions[current].answer ? 1 : 0));
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h1 className="quiz-title">
          📘 {category ? category.toUpperCase() : "QUIZ"}
        </h1>

        <h2 className="quiz-question">
          Question {current + 1} of {questions.length}
        </h2>

        <p className="quiz-text">{questions[current].question}</p>

        <div className="quiz-options">
          {questions[current].options.map((opt, index) => {
            const isCorrect = opt === questions[current].answer;
            const isSelected = opt === selected;

            return (
              <label
                key={index}
                className={`quiz-option ${
                  selected === opt ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="option"
                  value={opt}
                  checked={selected === opt}
                  onChange={() => handleSelect(opt)}
                />

                {opt}

                {/* ✅ Show icons */}
                {showResult && isCorrect && " ✅"}
                {showResult && isSelected && !isCorrect && " ❌"}
              </label>
            );
          })}
        </div>

        <button
          className="quiz-btn"
          onClick={handleNext}
          disabled={!selected}
        >
          {current === questions.length - 1 ? "Finish 🏁" : "Next ➜"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;