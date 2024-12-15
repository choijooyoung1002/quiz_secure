import React, { useState, useCallback } from 'react';
import { StartScreen } from './components/StartScreen';
import { QuizQuestion } from './components/QuizQuestion';
import { questions, getRandomQuestions } from './data/questions';

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isSerialConnected, setIsSerialConnected] = useState(false);
  const [currentColor, setCurrentColor] = useState<{ color: string, timestamp: number } | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [randomQuestions, setRandomQuestions] = useState<Question[]>([]);

  const handleColorReceived = useCallback((color: string) => {
    console.log('App: Color received:', color);
    setCurrentColor({ color, timestamp: Date.now() });
  }, []);

  const handleStart = () => {
    const questions = getRandomQuestions();
    setRandomQuestions(questions);
    setCurrentQuestionIndex(0);
    setCurrentQuestion(questions[0]);
    setIsStarted(true);
  };

  const handleAnswer = () => {
    if (currentQuestionIndex < randomQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentQuestion(randomQuestions[currentQuestionIndex + 1]);
    } else {
      setIsStarted(false);
    }
  };

  return isStarted ? (
    <QuizQuestion 
      question={currentQuestion}
      onAnswer={handleAnswer}
      currentColor={currentColor}
    />
  ) : (
    <StartScreen 
      onStart={handleStart}
      isSerialConnected={isSerialConnected}
      setIsSerialConnected={setIsSerialConnected}
      setSerialHandler={handleColorReceived}
    />
  );
};

export default App;