import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Link } from 'react-router-dom';

export const TopPage = () => {
  const [message, setMessage] = useState('');
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isClockedOut, setIsClockedOut] = useState(false);

  useEffect(() => {
    const fetchTodayAttendance = async () => {
      let today = new Date()
        .toLocaleString('ja-JP', {
          timeZone: 'Asia/Tokyo',
        })
        .split(' ')[0]
        .replaceAll('/', '-');

      const response = await fetch(`/api/attendances?date=${today}`);
      if (response.ok) {
        const result = await response.json();
        if (result.data) {
          setIsClockedIn(true);
          if (result.data.clock_out) {
            setIsClockedOut(true);
          }
        }
      }
    };
    fetchTodayAttendance();
  }, []);

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
      <div className="link">
        <p>
          <Link to="/summary">勤怠一覧</Link>
        </p>
      </div>
    </>
  );
};
