import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Clock } from '../components/Clock';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthUserContext';

export const TopPage = () => {
  const [message, setMessage] = useState('');
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isClockedOut, setIsClockedOut] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

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

  const handleLogout = async () => {
    await logout();
    navigate('login');
  };

  return (
    <>
      <Header innerText="Mini-Kintai" onLogout={handleLogout} />
      <div className="bg-gray-50 py-8 px-4 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">打刻</h2>
          <Clock />
          {message && (
            <p className="text-center text-green-700 font-bold mb-4 bg-green-100 py-2 rounded">
              {message}
            </p>
          )}
          <div className="mb-4 flex gap-5">
            <button
              onClick={handleClockIn}
              disabled={isClockedIn}
              className={
                isClockedIn
                  ? 'flex-1 bg-gray-300 text-gray-600 font-bold py-2 rounded'
                  : 'flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded'
              }
            >
              出勤
            </button>
            <button
              onClick={handleClockOut}
              disabled={isClockedOut}
              className={
                isClockedOut
                  ? 'flex-1 bg-gray-300 text-gray-600 font-bold py-2 rounded'
                  : 'flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded'
              }
            >
              退勤
            </button>
          </div>
          <div className="mb-5 mt-5">
            <Link
              to="/summary"
              className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 mb-2 rounded"
            >
              勤怠一覧
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
