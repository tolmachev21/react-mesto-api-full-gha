import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup-fullscreen ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__case">
        <button className="popup__close-button" onClick={props.onClose} alt={props.card.name} type="button" aria-label="Закрыть открытую картинку"></button>
        <img className="popup__image" src={props.card.link} alt="Картинка на весь экран"></img>
        <p className="popup__subtitle">{props.card.name}</p>
      </div>
    </div>
  )
};

export default ImagePopup;