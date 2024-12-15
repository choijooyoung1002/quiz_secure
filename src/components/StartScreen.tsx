import React from 'react';
import { Play } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  React.useEffect(() => {
    const handleKeyPress = () => onStart();
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onStart]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl text-center">
        <Play className="w-16 h-16 mx-auto mb-6 text-indigo-600" />
        <h1 className="text-4xl font-bold mb-4">퀴즈 시작하기</h1>
        <p className="text-xl text-gray-600 mb-8">아무 키나 눌러서 시작하세요</p>
        <button
          onClick={onStart}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-indigo-700 transition-colors"
        >
          시작하기
        </button>
      </div>
    </div>
  );
};