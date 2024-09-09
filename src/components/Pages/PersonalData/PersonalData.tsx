import './PersonalData.scss';
import DOMPurify from 'dompurify';
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { escapeHtml } from '../../../Hooks/escapeHtml';

import baseApi from '../../../Services/baseApi';

const PersonalData = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const safeContent = escapeHtml(JSON.stringify(userData));

  const cleanData = DOMPurify.sanitize(JSON.stringify(userData));

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const response = await fetch('http://localhost:3000/me', {

          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        setUserData({
          name: data.name,
          email: data.email,
          password: data.password,
        });
      } catch (error) {

        reportError({
          message: 'Erreur lors de la récupération de vos données utilisateur:',
          error,
        });

      }
    };

    fetchUserData();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/me', {
        // Utilisez le bon URL si besoin
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData);
        setIsEditing(false);
        alert('Données mises à jour avec succès');
      } else {
        // Affichez le message d'erreur si le serveur répond avec un statut d'erreur
        const errorText = await response.text();
        console.error('Erreur de mise à jour:', errorText);
        alert('Erreur lors de la mise à jour des données');
      }
    } catch (error) {
      console.error(
        'Erreur lors de la mise à jour de vos données utilisateur:',
        error
      );
      alert('Erreur lors de la mise à jour de vos données utilisateur');
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="PersonalData">
      {cleanData}
      {safeContent}
      <header>
        <h1 className="PersonalData__Title">Données personnelles</h1>
      </header>
      <div className="PersonalData__details">

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label className="PersonalData__item">
                <strong>Nom :</strong>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  aria-label="Entrez votre nom"
                />
              </label>
              <label className="PersonalData__item">
                <strong>Email :</strong>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  aria-label="Entrez votre adresse e-mail"
                />
              </label>
              <label className="PersonalData__item">
                <strong>Mot de passe :</strong>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  aria-label="Entrez votre mot de passe"
                />
              </label>
            </div>
            <button type="submit" aria-label="Enregistrer les modifications">
              Enregistrer
            </button>
            <button
              type="button"
              onClick={handleCancelClick}
              aria-label="Annuler les modifications"
            >
              Annuler
            </button>
          </form>
        ) : (
          <div>
            <h2 className="PersonalData__item">
              <strong>Nom :</strong> {userData.name}
            </h2>
            <h2 className="PersonalData__item">
              <strong>Email :</strong> {userData.email}
            </h2>
            <h2 className="PersonalData__item">
              <strong>Mot de passe :</strong>
              {'*'.repeat(10)}
            </h2>
            <button
              onClick={handleEditClick}
              aria-label="Modifier les données personnelles"
            >
              Modifier
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalData;
