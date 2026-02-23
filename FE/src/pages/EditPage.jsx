import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { useEffect } from 'react';

export const EditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [workDate, setWorkDate] = useState('');
  const [formData, setFormData] = useState({
    clock_in: '',
    clock_out: '',
    break_minutes: 0,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAttendance = async () => {
      const response = await fetch(`/api/attendances/${id}`);
      if (response.ok) {
        const result = await response.json();
        const record = result.data.data;
        setFormData({
          clock_in: new Date(record.clock_in).toLocaleTimeString('ja-JP', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          clock_out: record.clock_out
            ? new Date(record.clock_out).toLocaleTimeString('ja-JP', {
                hour: '2-digit',
                minute: '2-digit',
              })
            : '',
          break_minutes: record.break_minutes || 0,
        });
        setWorkDate(record.work_date.split(' ')[0]);
      }
    };
    fetchAttendance();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {};

    // workDateをYYYY-MM-DDに変換
    const standardDate = workDate.includes('/')
      ? workDate
          .split('/')
          .map((v) => v.padStart(2, '0'))
          .join('-')
      : workDate;

    if (formData.clock_in) {
      // JST指定(+9)してから、UTCに変換
      const jstTimeString = `${standardDate}T${formData.clock_in}:00+09:00`;
      payload.clock_in = new Date(jstTimeString).toISOString();
    }

    if (formData.clock_out) {
      const jstTimeString = `${standardDate}T${formData.clock_out}:00+09:00`;
      payload.clock_out = new Date(jstTimeString).toISOString();
    }

    payload.break_minutes = Number(formData.break_minutes);

    const response = await fetch(`/api/attendances/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setMessage('記録を保存しました。');
      setTimeout(() => {
        navigate('/summary');
      }, 1500);
    }
  };

  return (
    <>
      <Header innerText="Mini-Kintai" />
      <div className="bg-gray-50 py-8 px-4">
        <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-2">勤務記録編集</h2>
          <p className="text-center text-gray-700 mb-6">日付：{workDate}</p>

          {message ? (
            <p className="text-center text-green-700 font-bold py-4 bg-green-100 mb-4 rounded">
              {message}
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  出勤時刻:
                </label>
                <input
                  type="time"
                  name="clock_in"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.clock_in}
                  onChange={(e) =>
                    setFormData({ ...formData, clock_in: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  退勤時刻:
                </label>
                <input
                  type="time"
                  name="clock_out"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.clock_out}
                  onChange={(e) =>
                    setFormData({ ...formData, clock_out: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  休憩時間（分）:
                </label>
                <input
                  type="number"
                  name="break_minutes"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.break_minutes}
                  onChange={(e) =>
                    setFormData({ ...formData, break_minutes: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
                >
                  保存
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/summary')}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 rounded"
                >
                  キャンセル
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
