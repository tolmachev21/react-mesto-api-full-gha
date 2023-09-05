import { useRef } from "react";
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup(props) {

  const inputName = useRef();
  const inputLink = useRef();

  // EditAddPlacePopup
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      title: inputName.current.value,
      link: inputLink.current.value,
    })
  }

  return (
    <PopupWithForm
      title='Новое место'
      name='add-card'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText='Сохранить'
    >
      <input
        ref={inputName}
        className="popup__input popup__input_field_place"
        id="card-place"
        type="text"
        name="title"
        defaultValue=""
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"></input>
      <span
        id="card-place-error"
        className="popup__error"></span>
      <input
        ref={inputLink}
        className="popup__input popup__input_field_link"
        id="card-link"
        type="url"
        name="link"
        defaultValue=""
        placeholder="Ссылка на картинку"
        required></input>
      <span
        id="card-link-error"
        className="popup__error"></span>
    </PopupWithForm>
  )
};

export default AddPlacePopup;