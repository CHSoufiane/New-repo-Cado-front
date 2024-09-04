import './MyEvents.scss';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, SetStateAction } from 'react';

function MyEvent({ user }: { user: any }) {
  const [selectedEvent, setSelectedEvent] = useState<{
    id: number;
    name: string;
    date: string;
    participants: any[];
  } | null>(null);
  const [events, setEvents] = useState<
    { id: number; name: string; date: string; participants: any[] }[]
  >([]);
  const [editingEvent, setEditingEvent] = useState<{
    id: number;
    name: string;
    date: string;
    participants: any[];
  } | null>(null);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [newParticipantName, setNewParticipantName] = useState('');
  const [newParticipantEmail, setNewParticipantEmail] = useState('');
  const [editParticipants, setEditParticipants] = useState(false);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3000/me', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      console.error('Erreur lors du chargement des événements:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [user]);

  const handleEventClick = (
    event: SetStateAction<{
      id: number;
      name: string;
      date: string;
      participants: any[];
    } | null>
  ) => {
    setSelectedEvent(event);
    setEditingEvent(null);
    setEditParticipants(false);
  };

  const handleEditClick = () => {
    if (selectedEvent) {
      setEventName((selectedEvent as { name: string }).name);
      setEventDate(selectedEvent.date);
      setEditingEvent(selectedEvent);
    }
  };

  const handleUpdateEvent = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/events/${selectedEvent?.id}`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: eventName,
            date: eventDate,
          }),
        }
      );
      if (response.ok) {
        const updatedEvent = await response.json();
        setEvents((prevEvents) =>
          prevEvents.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
        );
        setSelectedEvent(updatedEvent);
        setEditingEvent(null);
      } else {
        console.error("Erreur lors de la mise à jour de l'événement");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'événement:", error);
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return; // Assurez-vous que selectedEvent n'est pas null
    try {
      const response = await fetch(
        `http://localhost:3000/events/${selectedEvent.id}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );
      if (response.ok) {
        setEvents((prevEvents) =>
          prevEvents.filter((e) => e.id !== selectedEvent.id)
        );
        setSelectedEvent(null);
      } else {
        console.error(
          "Erreur lors de la suppression de l'événement",
          await response.text()
        );
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'événement:", error);
    }
  };
  const handleAddParticipant = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/events/${selectedEvent.id}/participants`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newParticipantName,
            email: newParticipantEmail,
          }),
        }
      );
      if (response.ok) {
        const updatedEvent = await response.json();
        setSelectedEvent(updatedEvent);
        setNewParticipantName('');
        setNewParticipantEmail('');
      } else {
        console.error("Erreur lors de l'ajout du participant");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du participant:", error);
    }
  };

  const handleRemoveParticipant = async (participantId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/events/${selectedEvent.id}/participants/${participantId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );
      if (response.ok) {
        const updatedEvent = await response.json();
        setSelectedEvent(updatedEvent);
      } else {
        console.error('Erreur lors de la suppression du participant');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du participant:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') setEventName(value);
    if (name === 'date') setEventDate(value);
    if (name === 'participantName') setNewParticipantName(value);
    if (name === 'participantEmail') setNewParticipantEmail(value);
  };

  return (
    <div className="MyEvents">
      <header className="MyEvents__Title">
        <h1 className="MyEvents__h1">Mes évènements</h1>
      </header>
      <div className="MyEvents__container">
        <div className="MyEvents__List">
          {events.map((event) => (
            <button
              className="MyEvents__Button"
              key={event.id} // Assurez-vous que chaque `event.id` est unique
              type="button"
              onClick={() => handleEventClick(event)}
            >
              {event.name}
            </button>
          ))}
        </div>
        {selectedEvent && (
          <div className="MyEvent__Details">
            <h2 className="MyEvent__Title">
              Nom : {selectedEvent.name.toUpperCase()}
            </h2>
            <h3 className="MyEvent__h3">Date :</h3>
            <p className="MyEvent__Date">{selectedEvent.date}</p>
            <h3 className="MyEvent__h3">Participants :</h3>
            <ul className="MyEvent__Participants-List">
              {selectedEvent.participants.map((participant) => (
                <li className="MyEvent__Participant" key={participant.id}>
                  {participant.name} - {participant.email}
                  <button
                    type="button"
                    onClick={() => handleRemoveParticipant(participant.id)}
                    aria-label="Supprimer le participant"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
            <h3 className="MyEvent__h3">Résultats du tirage :</h3>
            <ul className="MyEvent__Draw-Results">
              {selectedEvent.DrawResults &&
                Object.entries(selectedEvent.DrawResults).map(
                  ([giver, receiver], index) => (
                    <li key={index}>
                      {' '}
                      // Utilisez un identifiant unique si possible au lieu de
                      l'index
                      {giver} offre un cadeau à {receiver}
                    </li>
                  )
                )}
            </ul>
            {editParticipants && (
              <form onSubmit={handleAddParticipant}>
                <label>
                  Nom du participant :
                  <input
                    type="text"
                    name="participantName"
                    value={newParticipantName}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Email du participant :
                  <input
                    type="email"
                    name="participantEmail"
                    value={newParticipantEmail}
                    onChange={handleChange}
                  />
                </label>
                <button type="submit">Ajouter le participant</button>
              </form>
            )}
            <button onClick={handleEditClick} aria-label="Modifier l'événement">
              Modifier
            </button>
            <button
              className="MyEvent__Delete-Button"
              onClick={handleDeleteEvent}
              aria-label="Supprimer l'événement"
            >
              Supprimer
            </button>
            {editingEvent && (
              <form onSubmit={handleUpdateEvent}>
                <label>
                  Nom :
                  <input
                    type="text"
                    name="name"
                    value={eventName}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Date :
                  <input
                    type="date"
                    name="date"
                    value={eventDate}
                    onChange={handleChange}
                  />
                </label>
                <button type="submit">Enregistrer les modifications</button>
              </form>
            )}
            <button
              type="button"
              onClick={() => setEditParticipants(!editParticipants)}
              aria-label="Modifier les participants"
            >
              {editParticipants ? 'Annuler' : 'Modifier les participants'}
            </button>
          </div>
        )}
      </div>
      <button
        type="button"
        className="MyEvent__Event-creation-button"
        onClick={() => navigate('/creer-un-evenement')}
      >
        Créer un événement
      </button>
    </div>
  );
}

export default MyEvent;
