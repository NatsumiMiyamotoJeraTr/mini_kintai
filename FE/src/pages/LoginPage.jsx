import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthUserContext';
import { Header } from '../components/Header';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/top');
    } catch {
      setMessage('ログインに失敗しました。');
    }
  };

  return (
    <>
      <Header innerText="Mini-Kintai" />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 w-full max-w-md border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">ログイン</h2>
          {message && (
            <p className="text-red-700 text-center mb-4 font-bold">{message}</p>
          )}
          <form onSubmit={handleSubmit}>
            <input
              value={email}
              placeholder="email"
              className="w-full px-3 py-2 border border-gray-300 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              value={password}
              placeholder="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
            >
              ログイン
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
