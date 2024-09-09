import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../../../assets/MainLogo.png';
import './Header.scss';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const logout = () => {
    localStorage.removeItem('token'); // Supprime le token du localStorage
    navigate('/se-connecter'); // Redirige l'utilisateur vers la page de connexion

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('authData')
  );

  useEffect(() => {
    function handleStorageChange() {
      setIsAuthenticated(!!localStorage.getItem('authData'));
    }

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('authData');
    setIsAuthenticated(false);
    navigate('/se-connecter');
  };

  let buttons;
  if (['/', '/s-inscrire', '/resultat'].includes(location.pathname)) {
    buttons = (
      <div>
        <button
          onClick={() =>
            navigate(isAuthenticated ? '/mon-compte' : '/se-connecter')
          }
        >
          {isAuthenticated ? 'Mon Compte' : 'Connexion'}
        </button>
      </div>
    );
  } else if (
    [
      '/mes-donnees-personnelles',
      '/mes-evenements',
      '/creer-un-evenement',
      '/details-evenement',
      '/faq',
      '/mentions-legales',
    ].includes(location.pathname)
  ) {
    buttons = (

      <div>
        <button onClick={() => navigate('/mon-compte')}>Mon Compte</button>
        <button onClick={logout}>Déconnexion</button>{' '}
        {/* Utilise la fonction logout */}

      <div className="Buttons-container">
        <button className="Button" onClick={() => navigate('/mon-compte')}>
          Mon Compte
        </button>
        <button className="Button" onClick={logout}>
          Déconnexion
        </button>{' '}
      </div>
    );
  } else if (location.pathname === '/mon-compte') {
    buttons = (
      <div>
        <button onClick={logout}>Déconnexion</button>{' '}

        {/* Utilise la fonction logout */}

      </div>
    );
  } else if (location.pathname === '/se-connecter') {
    buttons = null;
  }

  return (
    <header className="header">
      {location.pathname === '/' ? (
        <img src={logo} alt="Logo" className="logo" />
      ) : (
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      )}
      {buttons}
    </header>
  );
};

export default Header;
