import './MyEvents.scss';
import React, { useState } from 'react';

function MyEvent() {
  const [selectedEvent, setSelectedEvent] = useState<string>('');

  const handleEventClick = (event: string) => {
    setSelectedEvent(event);
  };

  return (
    <div className="WebsiteName">
      <header className="Website__Title">
        <h1>Mes évènements</h1>
      </header>
      <div className="MyEvent">
        <button type="button" onClick={() => handleEventClick('Événement 1')}>
          Événements 1
        </button>
        <button type="button" onClick={() => handleEventClick('Événement 2')}>
          Événements 2
        </button>
        <button type="button" onClick={() => handleEventClick('Événement 3')}>
          Événements 3
        </button>
        <button type="button" onClick={() => handleEventClick('Événement 4')}>
          Événements 4
        </button>

        {selectedEvent && (
          <div>
            <h2>{selectedEvent}</h2>
            <p>Détails de l&apos;événement...</p>
          </div>
        )}

        <h2>Nouvel événement</h2>
        <button className="MyEvent__confirmation" type="button">
          Créer un événement
        </button>
      </div>
    </div>
  );
}

export default MyEvent;
