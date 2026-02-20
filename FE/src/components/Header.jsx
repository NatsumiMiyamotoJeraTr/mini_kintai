import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthUserContext';

export const Header = ({ innerText }) => {
  const { user } = useAuth();

  if (user) {
    return (
      <header>
        <Link to="/top" style={{ textDecoration: 'none', color: 'inherit' }}>
          {innerText}
        </Link>
      </header>
    );
  }

  return <header>{innerText}</header>;
};
