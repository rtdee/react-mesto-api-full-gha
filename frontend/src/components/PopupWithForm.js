import React from "react";

function PopupWithForm (props) {

  return (
    <div className={`popup ${props.popupType} ${props.isOpen ? 'popup_opened' : ''}`} tabIndex="-1">
      <div className="popup__container">
        <h2 className="popup__title">{props.popupTitle}</h2>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
        <form className={`popup__form ${props.popupFormType}`} name={props.popupFormName} noValidate onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__save-button" type="submit">{props.popupButtonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;