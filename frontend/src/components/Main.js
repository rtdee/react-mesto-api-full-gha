import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const userInfo = React.useContext(CurrentUserContext);

  const cards = props.cards.map((card) => {
    return (
      <Card
        onCardClick={props.handleCardClick}
        card={card}
        setSelectedCard={props.setSelectedCard}
        key={card._id}
        onCardLike={props.onCardLike}
        onCardDelete={props.onCardDelete}
      />
    )
  });

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-overlay" onClick={props.handleEditAvatarClick}/>
        <img className="profile__avatar" src={userInfo.avatar} alt="аватар" />
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{userInfo.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={props.handleEditProfileClick}/>
          </div>
          <p className="profile__title">{userInfo.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить" onClick={props.handleAddPlaceClick}/>
      </section>
      <section className="elements" aria-label="фотосекция">
        {cards}
      </section>
    </main>
  );
}

export default Main;
