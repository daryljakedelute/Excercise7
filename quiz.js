// src/Quiz.jsx
import React, { useState } from 'react';

const Quiz = () => {
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["Paris", "Berlin", "Madrid", "Rome"],
            answer: "Paris",
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Venus", "Mars", "Jupiter"],
            answer: "Mars",
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            answer: "Pacific Ocean",
        },
        {
            question: "Which language is primarily spoken in Brazil?",
            options: ["Spanish", "English", "Portuguese", "French"],
            answer: "Portuguese",
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const handleOptionChange = (e) => {
        const value = e.target.value;
        setSelectedAnswers((prev) => {
            const newAnswers = [...prev];
            newAnswers[currentQuestion] = value;
            return newAnswers;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedAnswers[currentQuestion] === questions[currentQuestion].answer) {
            setScore((prev) => prev + 1);
        }
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setQuizFinished(true);
        }
    };

    const handleRetakeQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswers([]);
        setScore(0);
        setQuizFinished(false);
    };

    return (
        <div>
            <h1>Quiz Application</h1>
            {quizFinished ? (
                <div>
                    <h2>Your Score: {score}/{questions.length}</h2>
                    <button onClick={handleRetakeQuiz}>Retake Quiz</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2>{questions[currentQuestion].question}</h2>
                    {questions[currentQuestion].options.map((option, index) => (
                        <div key={index}>
                            <input
                                type="radio"
                                id={option}
                                name="quiz"
                                value={option}
                                checked={selectedAnswers[currentQuestion] === option}
                                onChange={handleOptionChange}
                                required
                            />
                            <label htmlFor={option}>{option}</label>
                        </div>
                    ))}
                    <button type="submit">Next</button>
                </form>
            )}
        </div>
    );
};

export default Quiz;
