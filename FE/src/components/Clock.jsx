import { useEffect, useState } from 'react';

const fetchCurrentTime = () => {
  const date = new Date();
  const H = String(date.getHours()).padStart(2, '0');
  const M = String(date.getMinutes()).padStart(2, '0');
  const S = String(date.getSeconds()).padStart(2, '0');
  return `${H}:${M}:${S}`;
};

export const Clock = () => {
  const [currentTime, setCurrentTime] = useState(fetchCurrentTime);
  const updateCurrentTIme = () => {
    setCurrentTime(fetchCurrentTime);
  };

  useEffect(() => {
    const intervalId = setInterval(updateCurrentTIme, 500);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <p className="text-center text-2xl font-bold mb-4">時刻: {currentTime}</p>
  );
};
