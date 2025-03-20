import { useState, useEffect } from "react";
import he from "he";
import styles from "./Question.module.css"; 

const Question = () => {
  const [category, setCategory] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuestion = async () => {
    try {
      setError(null); // Reset error before fetching
      const response = await fetch("https://opentdb.com/api.php?amount=1&category=15&type=boolean");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const trivia = data.results[0];
        setCategory(he.decode(trivia.category));
        setQuestion(he.decode(trivia.question));
        setAnswer(he.decode(trivia.correct_answer));
      } else {
        throw new Error("No questions found.");
      }
    } catch (err) {
      console.error("Error fetching question:", err);
      setError("Failed to load question. Please try again.");
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <div className={styles.container}>
      {error ? (
        <div>
          <p className={styles.error}>{error}</p>
          <button className={styles.button} onClick={fetchQuestion}>
            Reload
          </button>
        </div>
      ) : (
        <>
          <div className={styles.category}>Category: {category}</div>
          <h3 className={styles.question}>{question}</h3>
          <button className={styles.button} onClick={() => setRevealed(true)}>
            Reveal Answer
          </button>
          {revealed && <div className={styles.answer}>Answer: {answer}</div>}
        </>
      )}
    </div>
  );
};

export default Question;
