// Importation des hooks et des styles nécessaires
import React, { useState, useEffect } from 'react';
import './EventDetails.scss';

// Définition des interfaces pour les participants et les événements
interface Participant {
  name: string;
  email: string;
}

interface Event {
  name: string;
  date: string;
  participants: Participant[];
}

// Composant pour afficher les détails d'un participant
const ParticipantDetails: React.FC<{ participant: Participant }> = ({
  participant,
}) => (
  // Affiche le nom et l'email du participant
  <div className="event-details__participant">
    <input
      className="event-details__participant__input-name"
      type="text"
      value={participant.name}
      readOnly
    />
    <input
      className="event-details__participant__input-email"
      type="text"
      value={participant.email}
      readOnly
    />
  </div>
);

// Composant principal pour afficher les détails d'un événement
const EventDetails: React.FC = () => {
  // Utilisation du hook useState pour gérer l'état de l'événement et de l'erreur
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Utilisation du hook useEffect pour effectuer la requête API au montage du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Effectue la requête API et met à jour l'état de l'événement avec les données reçues
        const response = await fetch('URL_API');
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        // En cas d'erreur, met à jour l'état de l'erreur avec un message d'erreur
        setError('Une erreur est survenue lors du chargement des données.');
      }
    };

    // Appelle la fonction fetchData
    fetchData();
  }, []);

  // Si une erreur est survenue, affiche le message d'erreur
  if (error) {
    return <div>{error}</div>;
  }

  // Si les données ne sont pas encore chargées, affiche "Loading..."
  if (!event) {
    return <div>Loading...</div>;
  }

  // Affiche les détails de l'événement
  return (
    <div className="event-details-page">
      <button className="myevents-button"> Tous mes évènements</button>
      <h1 className="event-details__title">{event.name}</h1>

      <form className="event-details">
        <div className="event-details__element">
          <h3>Nom de l'évènement :</h3>
          <input type="text" value={event.name} readOnly />
        </div>
        <div className="event-details__element">
          <h3>Date de l'évènement :</h3>
          <input type="text" value={event.date} readOnly />
        </div>
        <div className="event-details__element">
          <h3>Participants :</h3>
          {/* Pour chaque participant, affiche les détails du participant */}
          {event.participants.map((participant, index) => (
            <ParticipantDetails key={index} participant={participant} />
          ))}
        </div>
      </form>
    </div>
  );
};

// Exporte le composant pour pouvoir l'utiliser ailleurs
export default EventDetails;
