import './SignUp.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import baseApi from '../../../Services/baseApi';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [signUpStatus, setSignUpStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.trim() !== confirmPassword.trim()) {
      setErrorMessage('Les mots de passe ne correspondent pas');
      return;
    }

    fetch('http://localhost:3000/register/', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.name && data.email && data.password) {
          setSignUpStatus('Inscription réussie !');
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          navigate('/se-connecter'); // Redirect to the login page
        } else {
          setSignUpStatus("Échec de l'inscription : Données manquantes");
        }
      })
      .catch((error) => {
        console.log('Error:', error);
        setSignUpStatus("Échec de l'inscription : une erreur est survenue");
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      });
  };
  return (
    <div className="SignUp__Page">
      <header className="SignUp__title">
        <h1 className="SignUp__h1">Organisez rapidement vos évènements</h1>
      </header>
      <div className="SignUp">
        <h2 className="SignUp__h2">Inscription</h2>
        {errorMessage && <p className="SignUp__error">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="Input">
            Nom :
          </label>
          <input
            className="SignUp__name"
            type="text"
            id="name"
            placeholder="Entrez votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email" className="Input">
            Email :
          </label>
          <input
            className="SignUp__email"
            type="email"
            id="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password" className="Input">
            Mot de passe :
          </label>
          <input
            className="SignUp__password"
            type="password"
            id="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="confirmPassword" className="Input">
            Confirmer le mot de passe :
          </label>
          <input
            className="SignUp__confirmPassword"
            type="password"
            id="confirmPassword"
            placeholder="Confirmez votre mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {signUpStatus && <p>{signUpStatus}</p>}
          <button className="SignUp__confirmation" type="submit">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
