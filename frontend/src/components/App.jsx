import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import api from '../utils/Api.js';
import Header from './Header.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import CurrentUserContext from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import InfoToolTip from './InfoToolTip.jsx';
import { registration, authorization, getUserData } from '../utils/auth.js';
import ProtectedHome from './ProtectedHome.jsx';


function App() {

    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(false);

    const [isSuccessful, setSuccessful] = useState(false);

    // Стейты контекста
    const [currentUser, setCurrentUser] = useState({});
    const [userEmail, setUserEmail] = useState('');
    // Стейты карточек
    const [cards, setCards] = useState([]);
    const [deleteCardId, setDeleteCardId] = useState('');
    // Стейты попапов
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
    const [isResultPopupOpen, setResultPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    };

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    };

    function handleDeleteCardClick(cardId) {
        setDeleteCardId(cardId);
        setDeletePopupOpen(true);
    };

    function handleCardClick(card) {
        setSelectedCard(card);
        setImagePopupOpen(true);
    };

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setDeletePopupOpen(false);
        setImagePopupOpen(false);
        setResultPopupOpen(false);
    };

    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                .then(([dataUser, dataCards]) => {
                    setCurrentUser(dataUser);
                    setCards(dataCards);
                })
                .catch(err => console.error(`Ошибка при отрисовке карточек ${err}`))
        }
    }, [loggedIn]);

    useEffect(() => {
        if (localStorage.token) {
            getUserData(localStorage.token)
                .then(res => {
                    setUserEmail(res.email)
                    setLoggedIn(true)
                    navigate('/')
                })
                .catch(err => {
                    setLoggedIn(false);
                    console.error(`Ошибка авторизации при повторном входе ${err}`)})
        } else {
            setLoggedIn(false)
        }
    }, [navigate])

    function handleUpdateAvatar(dataAvatar) {
        api.editUserAvatar(dataAvatar)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => `Ошибка при редактировании аватара ${err}`)
    };

    function handleUpdateUser(dataUserInfo) {
        api.editUserInfo(dataUserInfo)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => `Ошибка при редактировании профиля ${err}`)
    };

    function handleAddPlace(dataCard) {
        api.addNewCard(dataCard)
            .then((res) => {
                setCards([res, ...cards]);
                closeAllPopups();
            })
            .catch((err) => `Ошибка при добавлении карточки ${err}`)
    }

    function handleDeleteSubmit(event) {
        event.preventDefault();
        api.deleteCard(deleteCardId)
            .then(() => {
                setCards(cards.filter(item => {
                    return item._id !== deleteCardId
                }))
                closeAllPopups();
            })
            .catch((err) => `Ошибка при удалении карточки ${err}`)
    };

    function handleLogin(data) {
        authorization(data)
            .then(res => {
                localStorage.setItem('token', res.token)
                setLoggedIn(true)
                navigate('/')
            })
            .catch(err => {
                setResultPopupOpen(true)
                setSuccessful(false)
                console.error(`Ошибка при авторизации ${err}`)
            })
    };

    function handleRegister(data) {
        registration(data)
            .then(() => {
                setSuccessful(true)
                navigate('/sign-in')
            })
            .catch(err => {
                setSuccessful(false)
                console.error(`Ошибка при регистрации ${err}`)
            })
            .finally(() => { setResultPopupOpen(true) })
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Routes>
                    <Route path='/' element={
                        <>
                            <ProtectedRoute
                                element={ProtectedHome}
                                loggedIn={loggedIn}
                                userEmail={userEmail}
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onCardClick={handleCardClick}
                                onDeleteClick={handleDeleteCardClick}
                                cards={cards}
                            />
                            <Footer />
                        </>
                    }
                    />

                    <Route path='/sign-in' element={
                        <>
                            <Header name='signin' />
                            <Login name='signin' handleLogin={handleLogin} />
                        </>
                    } />

                    <Route path='/sign-up' element={
                        <>
                            <Header name='signup' />
                            <Register name='signup' handleRegister={handleRegister} />
                        </>
                    } />

                    <Route path='*' element={<Navigate to='/' replace />} />
                </Routes>

                <EditAvatarPopup
                    onUpdateAvatar={handleUpdateAvatar}
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                />
                <EditProfilePopup
                    onUpdateUser={handleUpdateUser}
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                />
                <AddPlacePopup
                    onAddPlace={handleAddPlace}
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                />

                <PopupWithForm
                    name={'delete-card'}
                    title={'Вы уверены?'}
                    onSubmit={handleDeleteSubmit}
                    isOpen={isDeletePopupOpen}
                    onClose={closeAllPopups}
                    buttonText={'Да'}
                />

                <ImagePopup
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups}
                />

                <InfoToolTip
                    name={'result'}
                    isSuccessful={isSuccessful}
                    isOpen={isResultPopupOpen}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider >
    );
};

export default App;