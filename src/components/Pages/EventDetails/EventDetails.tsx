import React, { useState } from 'react';
import myEvents from '../MyEvents/MyEvents';
import './EventDetails.scss';

interface Participant {
  name: string;
  email: string;
}

interface Event {
  name: string;
  date: string;
  participants: Participant[];
}

const EventDetails: React.FC = () => {
  const [event, setEvent] = useState<Event>(myEvents[0]); // Utilisez le premier événement comme état initial

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
    </div>
  );
};

export default EventDetails;
