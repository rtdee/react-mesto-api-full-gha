import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/api.js';
import { register, authorize, checkToken } from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import InfoTooltip from './InfoTooltip.js';
import Register from './Register.js';
import Login from './Login.js';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ProtectedRouteElement from './ProtectedRouteElement.js';
import successImg from '../images/success.svg';
import failImg from '../images/fail.svg';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [signUpStatusIcon, setSignUpStatusIcon] = React.useState('');
  const [signUpStatusText, setSignUpStatusText] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    handleTokenCheck();
  }, [])


  React.useEffect(() => {
    const token = localStorage.getItem('token');
    api.getUserInfo(token)
      .then((res) => {
        console.log(`effect getuserinfo ${JSON.stringify(res)}`)
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          myId: res._id
        });
      })
      .catch((err) => {
        alert(`getUserInfo ERROR: ${err}`)
      })
  }, [])

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setTimeout(() => {
      setSelectedCard({});
      setSignUpStatusIcon('');
      setSignUpStatusText('');
    }, 500);
  }

  function handleUpdateUser(data) {
    const token = localStorage.getItem('token');
    api.patchUserInfo(data, token)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          name: data.name,
          about: data.about,
        });
        closeAllPopups();
      })
      .catch((err) => {
        alert(`patchUserInfo ERROR: ${err}`)
      })
  }

  function handleUpdateAvatar(data) {
    const token = localStorage.getItem('token');
    api.patchAvatar(data, token)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          avatar: data.avatar
        });
        closeAllPopups();
      })
      .catch((err) => {
        alert(`patchAvatar ERROR: ${err}`)
      })
  }

  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    api.getInitialCards(token)
      .then((res) => {
        console.log('getinitcards'+res)
        setCards(res)
      })
      .catch((err) => {
        alert(`getInitialCards ERROR: ${err}`)
      })
  }, [])

    function handleCardLike(card) {
      const isLiked = card.likes.some(el => el._id === currentUser.myId);
      const token = localStorage.getItem('token');
      if (!isLiked) {
        api.putLike(card._id, token)
          .then((newCard) => {
            setCards((cards) => cards.map((el) => el._id === card._id ? newCard : el));
          })
          .catch((err) => {
            alert(`putLike ERROR: ${err}`)
          })
      } else {
        api.deleteLike(card._id, token)
          .then((newCard) => {
            setCards((cards) => cards.map((el) => el._id === card._id ? newCard : el));
          })
          .catch((err) => {
            alert(`deleteLike ERROR: ${err}`)
          })
      }
    };
    
    function handleCardDelete(card) {
      const token = localStorage.getItem('token');
      api.deleteCard(card._id, token)
        .then(() => {
          setCards((cards) => cards.filter(function(newCard) {
            return newCard._id !== card._id
          }));
        })
        .catch((err) => {
          alert(`deleteCard ERROR: ${err}`)
        })
    }

    function handleAddPlaceSubmit(data) {
      const token = localStorage.getItem('token');
      console.log("handle" + JSON.stringify(data))
      api.postNewCard(data, token)
        .then((newCard) => {
          console.log('postnewcard'+ newCard)
          setCards([newCard, ...cards]);
          closeAllPopups();
        })
        .catch((err) => {
          alert(`postNewCard ERROR: ${err}`)
        })
    }

    function handleSignUp (data) {
      register(data)
        .then((res) => {
          setSignUpStatusIcon(successImg)
          setSignUpStatusText('Вы успешно зарегистрировались!')
          setIsInfoTooltipOpen(true);
          return res;
        })
        .catch((err) => {
          setSignUpStatusIcon(failImg)
          setSignUpStatusText('Что-то пошло не так! Попробуйте ещё раз.')
          setIsInfoTooltipOpen(true);
          console.log(`handleSignUp ERROR: ${err}`)
        })
    }

    function handleLogIn (data) {
      console.log(data)
      authorize(data)
      .then((data) => {
        console.log(data);
        if (data) {
          localStorage.setItem('token', data);
          return data;
        }
      })
      .then(() => {
        handleTokenCheck();
      })
      .catch(err => alert(`handleLogIn ERROR: ${err}`))
    }

    function handleTokenCheck() {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        checkToken(token)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              console.log(res);
              return res;
            }
          })
          .then((res) => {
            setUserEmail(res.email);
            navigate("/main", { replace: true });
          })
          .catch(err => alert(`handleTokenCheck ERROR: ${err}`))
      }
    }

    function handleLogout() {
      localStorage.removeItem('token');
      navigate("/login", { replace: true });
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header email={userEmail}
                  handleLogout={handleLogout}
          />
          <EditProfilePopup isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopups}
                            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup  isOpen={isAddPlacePopupOpen}
                          onClose={closeAllPopups}
                          onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup  isOpen={isEditAvatarPopupOpen}
                            onClose={closeAllPopups}
                            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm  isOpen={isConfirmDeletePopupOpen}
                          onClose={closeAllPopups}
                          popupType={"confirm-popup"} 
                          popupTitle={"Вы уверены?"} 
                          popupButtonText={"Да"}
                          popupFormType={"confirm-popup-form"}
                          popupFormName={"formconfirm"}
                          children={<></>}
          />
          <ImagePopup isOpen={isImagePopupOpen}
                      onClose={closeAllPopups}
                      link={selectedCard.link}
                      name={selectedCard.name}
          />
          <InfoTooltip isOpen={isInfoTooltipOpen}
                       onClose={closeAllPopups}
                       popupTitle={signUpStatusText}
                       statusIcon={signUpStatusIcon}
          />
          <Routes>
            <Route path="*"
                   element={loggedIn ? <Navigate to="/main" replace /> : <Navigate to="/login" replace />} />
            <Route path="/main" element={
              <ProtectedRouteElement loggedIn={loggedIn} element={
                <Main handleEditProfileClick={setIsEditProfilePopupOpen}
                      handleAddPlaceClick={setIsAddPlacePopupOpen}
                      handleEditAvatarClick={setIsEditAvatarPopupOpen}
                      handleCardClick={setIsImagePopupOpen}
                      setSelectedCard={setSelectedCard}
                      cards={cards}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                />}
              />
            }/>
            <Route path="/signup" element={<Register onSubmit={handleSignUp} />} />
            <Route path="/login" element={<Login onSubmit={handleLogIn} />} />
          </Routes>
          <Footer/>
        </div>
      </div>    
    </CurrentUserContext.Provider>  
  );
}
export default App;
