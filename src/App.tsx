import React, { useState, useCallback } from 'react';
import { StartScreen } from './components/StartScreen';
import { QuizQuestion } from './components/QuizQuestion';
import { questions } from './data/questions';

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isSerialConnected, setIsSerialConnected] = useState(false);
  const [currentColor, setCurrentColor] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  const handleColorReceived = useCallback((color: string) => {
    setCurrentColor(color);
  }, []);

  const handleStart = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setIsStarted(true);
  };

  return isStarted ? (
    <QuizQuestion 
      question={currentQuestion}
      onAnswer={() => setIsStarted(false)}
      currentColor={currentColor}
    />
  ) : (
    <StartScreen 
      onStart={handleStart}
      isSerialConnected={isSerialConnected}
      setIsSerialConnected={setIsSerialConnected}
      onColorReceived={handleColorReceived}
    />
  );
};

export default App;