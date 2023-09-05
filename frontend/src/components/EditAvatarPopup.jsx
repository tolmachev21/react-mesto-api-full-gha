import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup(props) {
  const input = useRef();

  // EditAvatarPopup
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: input.current.value,
    });
  }

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Обновить аватар'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText='Сохранить'
    >
      <input
        ref={input}
        className="popup__input popup__input_field_link"
        id="avatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        required></input>
      <span
        id="avatar-error"
        className="popup__error"></span>
    </PopupWithForm>
  )
};

export default EditAvatarPopup;