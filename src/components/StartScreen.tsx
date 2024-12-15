import React, { useState, useEffect } from 'react';

interface StartScreenProps {
  onStart: () => void;
  isSerialConnected: boolean;
  onSerialConnect: () => Promise<void>;
}

export const StartScreen = ({ onStart, isSerialConnected, onSerialConnect }: StartScreenProps) => {
  const [text, setText] = useState('');
  const fullText = '>> 최고 기밀 :: 보안 레벨 4 접근 요청 <<';

  const handleConnect = async () => {
    try {
      await onSerialConnect();
    } catch (err) {
      console.error('시리얼 연결 실패:', err);
    }
  };

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) index = 0;
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {/* 스캔라인과 배경 효과 */}
      <div className="scanlines"></div>
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        {/* 그리드 배경 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,50,0,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,50,0,0.2)_1px,transparent_1px)] bg-[size:25px_25px]" />
        {/* CRT 스캔라인 효과 */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_2px] pointer-events-none" />
        <div className="relative z-10 bg-black/80 p-8 border-2 border-green-700 w-full max-w-3xl">
          {/* 상단 경고 표시 */}
          <div className="border border-yellow-500 bg-yellow-900/20 text-yellow-500 px-4 py-2 mb-6 text-sm font-mono">
            ⚠ WARNING: AUTHORIZED PERSONNEL ONLY ⚠
          </div>
          {/* 시리얼 연결 상태 */}
          <div className={`border ${isSerialConnected ? 'border-green-500' : 'border-red-500'} 
                        px-4 py-2 mb-6 text-sm font-mono flex justify-between items-center`}>
            <span className={isSerialConnected ? 'text-green-500' : 'text-red-500'}>
              SERIAL STATUS: {isSerialConnected ? 'CONNECTED' : 'DISCONNECTED'}
            </span>
            <button
              onClick={handleConnect}
              disabled={isSerialConnected}
              className={`px-4 py-1 border ${isSerialConnected 
                ? 'border-green-500 text-green-500' 
                : 'border-red-500 text-red-500'} 
                hover:bg-green-900/20`}
            >
              {isSerialConnected ? 'CONNECTED' : 'CONNECT DEVICE'}
            </button>
          </div>
          {/* 메인 콘텐츠 */}
          <div className="text-center mb-8">
            <h1 className="text-green-500 font-mono text-2xl mb-4">{text}</h1>
          </div>
          {/* 시작 버튼 */}
          <button
            onClick={onStart}
            className="w-full py-4 font-mono text-lg border-2 border-green-500 text-green-500 
                     hover:bg-green-900/20"
          >
            START
          </button>
        </div>
      </div>
    </div>
  );
};