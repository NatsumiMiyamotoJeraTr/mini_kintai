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
      <div>
        <h2>勤務記録編集</h2>
        <p>日付：{workDate}</p>

        {message ? (
          <p>{message}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                出勤時刻:
                <input
                  type="time"
                  name="clock_in"
                  value={formData.clock_in}
                  onChange={(e) =>
                    setFormData({ ...formData, clock_in: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                退勤時刻:
                <input
                  type="time"
                  name="clock_out"
                  value={formData.clock_out}
                  onChange={(e) =>
                    setFormData({ ...formData, clock_out: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                休憩時間（分）:
                <input
                  type="number"
                  name="break_minutes"
                  min="0"
                  value={formData.break_minutes}
                  onChange={(e) =>
                    setFormData({ ...formData, break_minutes: e.target.value })
                  }
                />
              </label>
            </div>
            <button type="submit">保存</button>
            <button type="button" onClick={() => navigate('/summary')}>
              キャンセル
            </button>
          </form>
        )}
      </div>
      <div className="link">
        <p>
          <Link to="/top">トップページ</Link>
        </p>
      </div>
    </>
  );
};
