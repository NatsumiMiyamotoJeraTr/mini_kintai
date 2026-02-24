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
      <div className="bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">勤怠一覧</h2>
          {attendance.length === 0 ? (
            <p className="text-center text-gray-700 py-8">
              勤怠記録がありません
            </p>
          ) : (
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg">
              <table className="w-full">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="px-4 py-2 text-center border-r border-gray-300">
                      日付
                    </th>
                    <th className="px-4 py-2 text-center border-r border-gray-300">
                      出勤時刻
                    </th>
                    <th className="px-4 py-2 text-center border-r border-gray-300">
                      退勤時刻
                    </th>
                    <th className="px-4 py-2 text-center border-r border-gray-300">
                      休憩時間(分)
                    </th>
                    <th className="px-4 py-2 text-center">編集</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((record) => (
                    <tr
                      key={record.id}
                      className="border-b border-gray-300 hover:bg-gray-50 text-center"
                    >
                      <td className="px-4 py-2 border-r border-gray-300">
                        {record.work_date.split(' ')[0]}
                      </td>
                      <td className="px-4 py-2 border-r border-gray-300">
                        {record.clock_in
                          ? new Date(record.clock_in).toLocaleTimeString(
                              'ja-JP',
                              { hour: '2-digit', minute: '2-digit' }
                            )
                          : '-'}
                      </td>
                      <td className="px-4 py-2 border-r border-gray-300">
                        {record.clock_out
                          ? new Date(record.clock_out).toLocaleTimeString(
                              'ja-JP',
                              { hour: '2-digit', minute: '2-digit' }
                            )
                          : '-'}
                      </td>
                      <td className="px-4 py-2 text-center border-r border-gray-300">
                        {record.break_minutes ?? 0}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <Link
                          to={`/attendances/${record.id}/edit`}
                          className="text-blue-600 hover:text-blue-800 font-bold"
                        >
                          ✎ 編集
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-8">
            <Link
              to="/top"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              ← トップページ
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
