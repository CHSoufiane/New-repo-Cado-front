import React, { useState } from 'react';
import myEvents from '../MyEvents/MyEvents';
import './EventDetails.scss';

interface Participant {
  name: string;
  email: string;
}

interface Event {
  id: string; // Ajout de l'ID de l'événement pour la suppression
  name: string;
  date: string;
  participants: Participant[];
}

const EventDetails: React.FC = () => {
  const [event, setEvent] = useState<Event>(myEvents[0]); // Utilisation du premier événement comme état initial

  // Fonction pour gérer la suppression de l'événement
  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        alert("L'événement a été supprimé avec succès !");
        // Rediriger ou mettre à jour l'état après la suppression
      } else {
        console.error("Erreur lors de la suppression de l'événement");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'événement:", error);
    }
  };

  return (
    <div className="event-details-page">
      <button className="myevents-button">Tous mes évènements</button>
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
          {event.participants.map((participant, index) => (
            <div key={index} className="event-details__participant">
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
          ))}
        </div>
      </form>

      {/* Bouton de suppression */}
      <button
        type="button"
        style={{ display: 'block', marginTop: '20px' }} // Forcer l'affichage du bouton
        className="event-details__delete-button"
        onClick={handleDeleteEvent}
      >
        Supprimer l'événement
      </button>
    </div>
  );
};

export default EventDetails;
