import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const {isOpen, onClose, onUpdateUser} = props;
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onUpdateUser={onUpdateUser}
      onSubmit={handleSubmit}
      popupType={"profile-popup"} 
      popupTitle={"Редактировать профиль"} 
      popupButtonText={"Сохранить"}
      popupFormType={"profile-popup-form"}
      popupFormName={"formprofile"}
      
      children={
        <>
          <input
          className="popup__txt-input popup__txt-input_type_name"
          type="text" id="profile-name-input"
          name="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          value={name || ''}
          onChange={handleNameChange}
          />
          <span className="popup__error profile-name-input-error"></span>
          <input
          className="popup__txt-input popup__txt-input_type_title"
          type="text" id="profile-title-input"
          name="about"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          value={description || ''}
          onChange={handleDescriptionChange}
          />
          <span className="popup__error profile-title-input-error"></span>
        </>
      }
    />
  )
}