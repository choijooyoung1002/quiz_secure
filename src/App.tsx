import React, { useState } from 'react';
import { StartScreen } from './components/StartScreen';
import { QuizQuestion } from './components/QuizQuestion';

function App() {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleAnswer = () => {
    setIsStarted(false);
  };

  return isStarted ? (
    <QuizQuestion onAnswer={handleAnswer} />
  ) : (
    <StartScreen onStart={handleStart} />
  );
}

export default App;