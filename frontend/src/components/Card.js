import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {

  function handleClick() {
    props.setSelectedCard(props.card);
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  
  const userInfo = React.useContext(CurrentUserContext);
  const isOwnCard = props.card.owner === userInfo.myId;

  const isLiked = props.card.likes.some(el => el._id === userInfo.myId)
  const cardLikeButtonClassName = ( 
    `element__like-button ${isLiked && 'element__like-button_active'}` 
  );

  return (
    <article className="element">
      {isOwnCard && <button className="element__delete-button" type="button" aria-label="Удалить" onClick={handleDeleteClick}/>}
      <img className="element__photo" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      <div className="element__container">
        <h2 className="element__header">{props.card.name}</h2>
        <div className="element__like-button-container">
          <button className={cardLikeButtonClassName} type="button" aria-label="Лайк" onClick={handleLikeClick}/>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;