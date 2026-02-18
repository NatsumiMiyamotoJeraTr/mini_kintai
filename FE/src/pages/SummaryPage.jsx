import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';

export const SummaryPage = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchUsersAllAttendance = async () => {
      const response = await fetch('/api/attendances');

      if (response.ok) {
        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
          setAttendance(data.data);
        }
      }
    };
    fetchUsersAllAttendance();
  }, []);

  return (
    <>
      <Header innerText="Mini-Kintai" />
      <h4>勤怠一覧</h4>
      {attendance.length === 0 ? (
        <p>勤怠記録がありません</p>
      ) : (
        <div>
          {
            <table border="1">
              <thead>
                <tr>
                  <th>日付</th>
                  <th>出勤時刻</th>
                  <th>退勤時刻</th>
                  <th>休憩時間(分)</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record.id}>
                    <td>{record.work_date.split(' ')[0]}</td>
                    <td>
                      {record.clock_in
                        ? new Date(record.clock_in).toLocaleTimeString(
                            'ja-JP',
                            { hour: '2-digit', minute: '2-digit' }
                          )
                        : '-'}
                    </td>
                    <td>
                      {record.clock_out
                        ? new Date(record.clock_out).toLocaleTimeString(
                            'ja-JP',
                            { hour: '2-digit', minute: '2-digit' }
                          )
                        : '-'}
                    </td>
                    <td>{record.break_minutes ?? 0}</td>
                    <td>
                      <Link to={`/attendances/${record.id}/edit`}>編集</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
      )}
      <div className="link">
        <p>
          <Link to="/top">トップページ</Link>
        </p>
      </div>
    </>
  );
};
