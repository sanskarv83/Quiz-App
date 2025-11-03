import React, { useState } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { quizData } from "./data/questions.js";
import "./App.css";

function App() {
  const [step, setStep] = useState("home");
  const [playerName, setPlayerName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  const startQuiz = (name, selectedCategory) => {
  // Normalize selectedCategory to kebab-case that matches quizData keys
  const key = selectedCategory
    .trim()
    .toLowerCase()
    .replace(/[\s&,+]+/g, "-")   // replace spaces, &, comma, + (one or more) with single -
    .replace(/-+/g, "-")         // collapse multiple - into one
    .replace(/(^-|-$)/g, "");    // remove leading/trailing -

  console.log("Selected Category key:", key);
  console.log("Available categories:", Object.keys(quizData));

  const selectedQuestions = quizData[key];

  if (selectedQuestions && selectedQuestions.length > 0) {
    setPlayerName(name);
    setQuestions(selectedQuestions);
    setStep("quiz");
  } else {
    alert("No questions found for this category!");
  }
};


  const handleQuizEnd = (finalScore) => {
    setScore(finalScore);
    setStep("result");
  };

  const restartQuiz = () => {
    setStep("home");
    setScore(0);
    setQuestions([]);
  };

  return (
    <div className="App">
      {step === "home" && <Home startQuiz={startQuiz} />}
      {step === "quiz" && (
  <Quiz
    questions={questions}
    playerName={playerName}
    onFinish={handleQuizEnd}
    category={Object.keys(quizData).find(
      key => quizData[key] === questions
    ) || "quiz"}
  />
)}

      {step === "result" && (
        <Result
          score={score}
          total={questions.length}
          playerName={playerName}
          restartQuiz={restartQuiz}
        />
      )}
    </div>
  );
}

export default App;
