import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DrawResult.scss';

interface DrawResults {
  giver: string;
  receiver: string;
  event_id: number;
}

function DrawResults() {
  const [drawPair, setDrawPair] = useState<DrawResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Correction du type d'erreur
  const { token } = useParams();

  useEffect(() => {
    const fetchDrawPair = async () => {
      try {
        const response = await fetch(`http://localhost:3000/view/${token}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des résultats');
        }
        const data = await response.json();
        console.log(data);
        setDrawPair(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrawPair();
  }, [token]);

  const fetchDrawResults = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/events/${event}/draw-results`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      const data = await response.json();
      setSelectedEvent((prevEvent) => ({ ...prevEvent, drawResults: data })); // Met à jour les résultats du tirage
    } catch (error) {
      console.error(
        'Erreur lors du chargement des résultats du tirage:',
        error
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="DrawResult">
      <h3>Résultats du tirage:</h3>
      {selectedEvent?.drawResults ? (
        <ul>
          {selectedEvent.drawResults.map((result, index) => (
            <li key={index}>
              {result.giver} offre un cadeau à {result.receiver}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun résultat de tirage trouvé</p>
      )}

      <h2>Résultat du tirage</h2>
      {drawPair ? (
        <p>Votre Secret Santa est : {drawPair.receiver}</p>
      ) : (
        <p>Aucun résultat disponible pour le tirage.</p>
      )}
    </div>
  );
}

export default DrawResults;
