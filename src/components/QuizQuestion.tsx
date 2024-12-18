import React, { useRef, useEffect, useState } from 'react';
import { Question } from '../data/questions';
import Confetti from 'react-confetti';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (index: number) => void;
  currentColor: { color: string, timestamp: number } | null;
}

export const QuizQuestion = ({ question, onAnswer, currentColor }: QuizQuestionProps) => {
  const buttonColors = [
    "border-red-700 text-red-400 hover:bg-red-900/30",     // 빨강
    "border-green-700 text-green-400 hover:bg-green-900/30", // 초록
    "border-yellow-700 text-yellow-400 hover:bg-yellow-900/30", // 노랑
    "border-blue-700 text-blue-400 hover:bg-blue-900/30"    // 파랑
  ];

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [isWrong, setIsWrong] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [prevColor, setPrevColor] = useState<string | null>(null);

  useEffect(() => {
    if (currentColor) {
      // 색상 매핑 순서: 빨초노파
      const colorIndex = { 'R': 0, 'G': 1, 'Y': 2, 'B': 3 }[currentColor.color];
      if (colorIndex !== undefined) {
        buttonRefs.current[colorIndex]?.click();
      }
      setPrevColor(currentColor.color);
    }
  }, [currentColor]);

  const handleAnswer = (index: number) => {
    if (index === question.correct) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        onAnswer(index);
      }, 3000);
    } else {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 820); // 애니메이션 시간
    }
  };

  return (
    <div className={`min-h-screen bg-black flex items-center justify-center transition-colors duration-300
                    ${isWrong ? 'bg-red-900/30 animate-shake' : ''}`}>
      {showConfetti && <Confetti />}
      <div className="scanlines"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,50,0,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,50,0,0.2)_1px,transparent_1px)] bg-[size:25px_25px]" />
      
      {/* CRT 스캔라인 효과 */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_2px] pointer-events-none" />
    
      <div className="relative z-10 bg-black/80 p-8 border-2 border-green-700 w-full max-w-3xl">
        {/* 상단 상태 표시 */}
        <div className="border border-green-700 bg-black/50 text-green-500 px-4 py-2 mb-6 text-sm font-mono flex justify-between">
          <span>SECURITY QUESTIONNAIRE</span>
          <span>CLEARANCE CHECK IN PROGRESS</span>
        </div>

        <div className="border border-green-700 p-6 bg-black/50">
          <h2 className="text-2xl font-mono text-green-500 mb-8 ">
            {'>'} {question.text}
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                ref={el => buttonRefs.current[index] = el}
                onClick={() => handleAnswer(index)}
                className={`border-2 bg-black/50 p-4 
                         font-mono transition-colors
                         flex items-center justify-center text-left
                         ${buttonColors[index]}`}
              >
                <span className="mr-2">[{String.fromCharCode(65 + index)}]</span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* 하단 상태 표시 */}
        <div className="mt-4 text-xs font-mono text-green-600 flex justify-between">
          <span>STATUS: ACTIVE</span>
          <span>REMAINING: 3</span>
          <span>SESSION: #7749</span>
        </div>
      </div>
    </div>
  );
};