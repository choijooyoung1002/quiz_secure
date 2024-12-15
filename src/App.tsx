import React, { useState, useEffect } from 'react';
import { StartScreen } from './components/StartScreen';
import { QuizQuestion } from './components/QuizQuestion';
import { questions } from './data/questions';
import { useWebSerial } from './hooks/useWebSerial';

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isSerialConnected, setIsSerialConnected] = useState(false);
  const [serialHandler, setSerialHandler] = useState<(color: string) => void>(() => {});
  const [randomQuestion, setRandomQuestion] = useState(questions[0]);

  // 시리얼 연결 함수
  const handleSerialConnect = async () => {
    try {
      const { connect } = useWebSerial((color) => {
        console.log('앱에서 수신한 색상:', color);
        serialHandler(color);
      });

      await connect();
      setIsSerialConnected(true);
      console.log('시리얼 연결 성공');
    } catch (err) {
      console.error('시리얼 연결 실패:', err);
      setIsSerialConnected(false);
    }
  };

  const handleStart = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setRandomQuestion(questions[randomIndex]);
    setIsStarted(true);
  };

  const handleAnswer = () => {
    setIsStarted(false);
  };

  return isStarted ? (
    <QuizQuestion 
      question={randomQuestion} 
      onAnswer={handleAnswer}
      onColorReceived={setSerialHandler}
    />
  ) : (
    <StartScreen 
      onStart={handleStart} 
      isSerialConnected={isSerialConnected}
      onSerialConnect={handleSerialConnect}
    />
  );
}

export default App;