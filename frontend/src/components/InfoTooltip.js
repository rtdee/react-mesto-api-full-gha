import React from "react";

function InfoTooltip (props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} tabIndex="-1">
      <div className="popup__container popup__container_type_info-tooltip">
        <img className="popup__status-icon" src={props.statusIcon} alt=""/>
        <h2 className="popup__title popup__title_type_info-tooltip">{props.popupTitle}</h2>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip;