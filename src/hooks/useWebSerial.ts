import { useState, useEffect, useCallback } from 'react';

export const useWebSerial = (onColorReceived: (color: string) => void) => {
  const [port, setPort] = useState<SerialPort | null>(null);
  const [reader, setReader] = useState<ReadableStreamDefaultReader | null>(null);
  const [lastColor, setLastColor] = useState<string>('');  // 마지막 색상 저장

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

  const connect = useCallback(async () => {
    if (!navigator.serial) {
      throw new Error('WebSerial이 지원되지 않는 브라우저입니다. Chrome을 사용해주세요.');
    }

    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });

      const reader = port.readable?.getReader();
      if (!reader) throw new Error('Failed to get reader');

      const processStream = async () => {
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            
            const color = new TextDecoder().decode(value);
            console.log('Raw color received:', color);
            onColorReceived(color.trim());
          }
        } catch (error) {
          console.error('Error reading serial:', error);
        } finally {
          reader.releaseLock();
        }
      };

      processStream();
    } catch (err) {
      console.error('Serial connection failed:', err);
      throw err;
    }
  }, [onColorReceived]);

  const sendMessage = async (message: string) => {
    if (!port) {
      throw new Error('Serial port is not connected');
    }

    const writer = port.writable?.getWriter();
    if (!writer) {
      throw new Error('Could not get writer');
    }

    try {
      const data = new TextEncoder().encode(message);
      await writer.write(data);
    } finally {
      writer.releaseLock();
    }
  };

  useEffect(() => {
    return () => {
      disconnect().catch(console.error);
    };
  }, []);

  return { connect, sendMessage };
};