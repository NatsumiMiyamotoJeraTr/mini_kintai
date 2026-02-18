import { useState } from 'react';
import { Header } from '../components/Header';

export const TopPage = () => {
  const [message, setMessage] = useState('');
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isClockedOut, setIsClockedOut] = useState(false);

  const handleClockIn = async () => {
    const response = await fetch('/api/attendances/clock-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setMessage('出勤しました');
      setIsClockedIn(true);
    } else {
      setMessage('出勤に失敗しました');
    }
  };

  const handleClockOut = async () => {
    const response = await fetch('/api/attendances/clock-out', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setMessage('退勤しました');
      setIsClockedOut(true);
    } else {
      setMessage('退勤に失敗しました');
    }
  };

  return (
    <>
      <Header innerText="Mini-Kintai" />
      <div>
        <p>{message}</p>
        <button onClick={handleClockIn} disabled={isClockedIn}>
          出勤
        </button>
        <button onClick={handleClockOut} disabled={isClockedOut}>
          退勤
        </button>
      </div>
    </>
  );
};
