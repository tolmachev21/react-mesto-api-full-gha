import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ButtonLike from './ButtonLike/ButtonLike';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  console.log(props)

  function handleClick() {
    props.onCardClick(props.card);
  };

  return (
    <article className="place">
      <img className="place__image" src={props.card.link} alt={`Картинка ${props.card.name}`} onClick={handleClick}></img>
      {currentUser._id === props.card.owner && <button className="place__trash" onClick={() => props.onDeleteClick(props.card._id)} type="button" aria-label="Удалить"></button>}
      <div className="place__caption">
        <h3 className="place__title">{props.card.name}</h3>
        <div className="place__like-container">
          <ButtonLike likes={props.card.likes} myId={currentUser._id} cardId={props.card._id} />
        </div>
      </div>
    </article>
  );
};

export default Card;