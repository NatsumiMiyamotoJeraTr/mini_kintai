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
      <div>
        <h2>ログイン</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={password}
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">ログイン</button>
        </form>
      </div>
    </>
  );
};
