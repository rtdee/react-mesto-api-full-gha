import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const {isOpen, onClose, onAddPlace} = props;
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [!isOpen])

  function handleNameInput(evt) {
    setName(evt.target.value);
  }

  function handleLinkInput(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm
    isOpen={isOpen}
    onClose={onClose}
    onAddPlace={onAddPlace}
    onSubmit={handleSubmit}
    popupType={"add-place-popup"} 
    popupTitle={"Новое место"} 
    popupButtonText={"Создать"}
    popupFormType={"add-place-popup__form"}
    popupFormName={"formplace"}

    children={
      <>
        <input
        className="popup__txt-input popup__txt-input_type_place"
        type="text"
        id="place-name-input"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={name || ''}
        onChange={handleNameInput}
        />
        <span className="popup__error place-name-input-error"></span>
        <input
        className="popup__txt-input popup__txt-input_type_photo"
        type="url"
        id="place-url-input"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={link || ''}
        onChange={handleLinkInput}
        />
        <span className="popup__error place-url-input-error"></span>
      </>
    }
    />
  )
}