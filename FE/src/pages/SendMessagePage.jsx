import { useState } from 'react';
import { useHeaderMessage } from '../contexts/ChatMessageContext';
import { Header } from '../components/Header';

export const SendMessagePage = () => {
  const [inputMessage, setInputMessage] = useState('');
  const { sendHeaderMessage } = useHeaderMessage();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage) return;

    sendHeaderMessage(trimmedMessage);
    setInputMessage('');
  };

  return (
    <>
      <Header innerText="Mini-Kintai" />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 w-full max-w-md border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">
            メッセージを送信
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              value={inputMessage}
              placeholder="感想を入力"
              className="w-full px-3 py-2 border border-gray-300 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
            >
              送信
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
