import React from 'react';
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
  };

  let buttons;
  if (
    ['/', '/s-inscrire', '/resultat', '/mentions-legales', '/faq'].includes(
      location.pathname
    )
  ) {
    buttons = (
      <div>
        <button onClick={() => navigate('/se-connecter')}>Connexion</button>
      </div>
    );
  } else if (
    [
      '/mes-donnees-personnelles',
      '/mes-evenements',
      '/creer-un-evenement',
      '/details-evenement',
    ].includes(location.pathname)
  ) {
    buttons = (
      <div>
        <button onClick={() => navigate('/mon-compte')}>Mon Compte</button>
        <button onClick={logout}>Déconnexion</button>{' '}
        {/* Utilise la fonction logout */}
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
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      {buttons}
    </header>
  );
};

export default Header;
