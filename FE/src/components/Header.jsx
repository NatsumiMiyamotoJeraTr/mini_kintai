import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthUserContext';
import { useHeaderMessage } from '../contexts/ChatMessageContext';

export const Header = ({ innerText, onLogout }) => {
  const { user } = useAuth();
  const { headerMessage } = useHeaderMessage();

  if (user) {
    return (
      <header className="bg-blue-500 text-white py-4 shadow-lg">
        <div className="flex justify-between items-center px-6">
          <Link to="/top" className="text-xl font-bold hover:text-blue-100">
            {innerText}
          </Link>
          {onLogout && (
            <button
              onClick={onLogout}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded text-sm"
            >
              ログアウト
            </button>
          )}
        </div>

        {headerMessage && (
          <div className="mt-2 border-t border-blue-400 px-6 pt-2">
            <marquee direction="left" scrollamount="6" className="font-medium">
              {headerMessage}
            </marquee>
          </div>
        )}
      </header>
    );
  }

  return (
    <header className="bg-blue-500 text-white py-4 shadow-lg">
      <div className="text-xl font-bold px-6">{innerText}</div>
    </header>
  );
};
