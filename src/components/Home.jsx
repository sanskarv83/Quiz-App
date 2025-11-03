// Home.jsx
import React, { useState } from "react";

const Home = ({ startQuiz }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const categories = [
    "Entertainment",
    "Heritage & History",
    "Literature & Language",
    "Sports & Games",
    "Science & Technology",
    "Current Affairs",
    "Business & Economy",
    "Nature & Wildlife",
    "Personalities",
    "Religion, Culture & Mythology",
  ];

  const handleStart = () => {
    if (name.trim() && category) {
      startQuiz(name, category);
    } else {
      alert("Please enter your name and select a category!");
    }
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">🎓 Welcome to the Quiz Game</h1>
        <p className="home-subtitle">
          Enter your name and choose your favorite topic to begin!
        </p>

        <div className="home-input-group">
          <input
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="home-input"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="home-select"
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button onClick={handleStart} className="home-btn">
            Start Quiz ➜
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
