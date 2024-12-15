import { useState, useEffect } from 'react';

interface SerialPort {
  readable: ReadableStream;
  open: (options: { baudRate: number }) => Promise<void>;
  close: () => Promise<void>;
}

export const useWebSerial = (onColorReceived: (color: string) => void) => {
  const [port, setPort] = useState<SerialPort | null>(null);

  const connect = async () => {
    try {
      console.log('시리얼 포트 요청 중...');
      const port = await navigator.serial.requestPort();
      console.log('포트 선택됨:', port);

      console.log('포트 열기 시도...');
      await port.open({ baudRate: 9600 });
      console.log('포트 열기 성공');
      setPort(port);

      const reader = port.readable.getReader();
      console.log('리더 생성됨');

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            console.log('시리얼 읽기 완료');
            break;
          }
          const char = new TextDecoder().decode(value);
          console.log('수신된 데이터:', char);
          if (['R', 'G', 'B', 'Y'].includes(char)) {
            console.log('유효한 색상 수신:', char);
            onColorReceived(char);
          }
        }
      } catch (err) {
        console.error('데이터 읽기 오류:', err);
      } finally {
        reader.releaseLock();
        console.log('리더 잠금 해제됨');
      }
    } catch (err) {
      console.error('시리얼 연결 실패:', err);
    }
  };

  useEffect(() => {
    return () => {
      if (port) {
        port.close();
        console.log('포트 닫힘');
      }
    };
  }, [port]);

  return { connect };
};