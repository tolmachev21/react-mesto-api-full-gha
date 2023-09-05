import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-button" onClick={props.onClose} type="button" aria-label={`Закрыть окно '${props.label}'`} />
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__submit-button popup__submit-button_state_valid" type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;