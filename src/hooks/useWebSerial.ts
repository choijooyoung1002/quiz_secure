import { useState, useEffect } from 'react';

export const useWebSerial = (onColorReceived: (color: string) => void) => {
  const [port, setPort] = useState<SerialPort | null>(null);
  const [reader, setReader] = useState<ReadableStreamDefaultReader | null>(null);

  const disconnect = async () => {
    if (reader) {
      await reader.cancel();
      reader.releaseLock();
      setReader(null);
    }
    if (port) {
      await port.close();
      setPort(null);
    }
  };

  const connect = async () => {
    if (!navigator.serial) {
      throw new Error('WebSerial이 지원되지 않는 브라우저입니다. Chrome을 사용해주세요.');
    }

    try {
      // 연결 가능한 포트 확인
      const ports = await navigator.serial.getPorts();
      console.log('사용 가능한 포트:', ports);

      console.log('시리얼 포트 선택 대기 중...');
      const newPort = await navigator.serial.requestPort();
      
      console.log('포트 열기 시도...');
      await newPort.open({ baudRate: 9600 });
      console.log('포트 열기 성공');
      setPort(newPort);

      // 리더 생성 전 readable 상태 확인
      if (!newPort.readable) {
        throw new Error('포트가 읽기 가능한 상태가 아닙니다.');
      }

      const newReader = newPort.readable.getReader();
      console.log('리더 생성 성공');
      setReader(newReader);

      // 데이터 읽기 루프를 별도 함수로 분리
      const readLoop = async () => {
        let retryCount = 0;
        const MAX_RETRIES = 3;
      
        while (retryCount < MAX_RETRIES) {
          try {
            console.log('읽기 루프 시작');
            
            if (!newPort.readable || !newReader) {
              throw new Error('리더가 유효하지 않습니다.');
            }

            while (true) {
              const { value, done } = await newReader.read();
              console.log('읽기 시도 결과:', { value, done });
              
              if (done) {
                console.log('읽기 종료');
                break;
              }
              
              if (!value) {
                console.warn('수신된 데이터가 없습니다');
                continue;
              }

              console.log('수신된 원시 데이터:', new Uint8Array(value).toString());
              const char = new TextDecoder().decode(value);
              console.log('디코딩된 문자:', char);
              
              if (['R', 'G', 'B', 'Y'].includes(char)) {
                console.log('유효한 색상 데이터 수신:', char);
                onColorReceived(char);
              }
            }
            
          } catch (error) {
            console.error(`데이터 읽기 중 오류 (시도 ${retryCount + 1}/${MAX_RETRIES}):`, error);
            retryCount++;
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      };

      // 즉시 읽기 루프 시작
      readLoop().catch(error => {
        console.error('읽기 루프 실패:', error);
      });
      
    } catch (error) {
      if ((error as Error).message.includes('No port selected')) {
        throw new Error('포트가 선택되지 않았습니다. 다시 시도해주세요.');
      }
      throw error;
    }
  };

  useEffect(() => {
    return () => {
      disconnect().catch(console.error);
    };
  }, []);

  return { connect };
};