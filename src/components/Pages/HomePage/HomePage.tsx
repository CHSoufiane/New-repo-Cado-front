
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import homeImage from '../../../../public/FavIcon.png';


import './HomePage.scss';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1 className="home__title">Bienvenue sur Cad'O</h1>
      <div className="home__container">
        <div className="home__concept-explaination">
          <h2 className="home__concept-explaination__title">
            Mais qu'est-ce que Cad'O ?
          </h2>
          <p className="home__paragraph">
            Le concept du Secret Santa est un moyen de s’offrir des cadeaux de
            façon anonyme : à l’aide d’un tirage au sort, chaque participant se
            voit attribuer par tirage au sort une personne à qui il offrira un
            cadeau. La personne qui reçoit le cadeau ne connaît pas l’identité
            de celui qui lui offre.
            <br />
            <br />
            Chez Cad'O, nous avons créé et mis à dispositin un outil qui vous
            permettra de faciliter l'organisation de vos Secret Santas !
          </p>
          <h3 className="home__concept-explaination__title2">
            Créez votre évènement dès maintenant !
          </h3>

          <button
            type="button"
            className="account-creation-button"
            onClick={() => navigate('/creer-un-evenement')}
          >
            Créer évènement
          </button>

        </div>
      </div>
    </div>
  );
}

export default HomePage;
