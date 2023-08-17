import React from "react";

function ImagePopup(props) {

  return (
    <div className={`popup photo-popup ${props.isOpen ? 'popup_opened' : ''}`} tabIndex="-1">
      <div className="photo-popup__container">
        <button className="popup__close-button popup__close-button_location_photo-popup" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
        <img className="photo-popup__img" src={props.link} alt={props.name}/>
        <h3 className="photo-popup__label">{props.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
