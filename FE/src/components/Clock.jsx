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
    const intervalId = setInterval(updateCurrentTIme, 500); // 0.5秒間隔で更新
    return () => {
      clearInterval(intervalId); // コンポーネント削除時に実行され、setInterval無限ループをクリア
    };
  }, []);

  return <p>時刻:{currentTime}</p>;
};
