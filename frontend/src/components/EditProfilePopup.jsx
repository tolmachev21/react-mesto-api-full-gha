import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";


function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  };

  function handleChangeDescription(evt) {
    setDescription(evt.target.value)
  };

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about)
  }, [currentUser.name, currentUser.about, isOpen])

  // EditPropfilePopup
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      user: name,
      job: description,
    });
  };

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit-profile'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Сохранить'
      >
      <input
        className="popup__input popup__input_field_name"
        id="profile-name"
        type="text"
        name="user"
        placeholder="Введите имя"
        required
        value={name ? name : ''}
        onChange={handleChangeName}
        minLength="2"
        maxLength="40"></input>
      <span
        id="profile-name-error"
        className="popup__error"></span>
      <input
        className="popup__input popup__input_field_job"
        id="profile-job"
        type="text"
        name="job"
        placeholder="Введите свою профессию"
        required
        value={description ? description : ''}
        onChange={handleChangeDescription}
        minLength="2"
        maxLength="200"></input>
      <span
        id="profile-job-error"
        className="popup__error"></span>
    </PopupWithForm>
  )
}


export default EditProfilePopup;