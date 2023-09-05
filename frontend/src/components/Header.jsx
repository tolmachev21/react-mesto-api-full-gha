import React from 'react';
import logo from '../images/Vector.svg';
import { Link } from 'react-router-dom';

const Header = function ({ name, dataUser }) {

  function onSighOut() {
    localStorage.removeItem('token');
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип проекта Место"></img>
      {dataUser ?
        <div className="header__info-container">
          <p className="header__email">{dataUser}</p>
          <Link to={'/sign-in'} className="header__leave" onClick={onSighOut}>Выйти</Link>
        </div> :
        <Link to={name === 'signup' ? '/sign-in' : '/sign-up'} className="header__subtitle-link">{name === 'signup' ? 'Войти' : 'Регистрация'}</Link>}
    </header>
  )
};

export default Header;