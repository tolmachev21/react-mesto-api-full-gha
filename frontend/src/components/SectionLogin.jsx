import { Link } from "react-router-dom";

function SectionLogin({ name, children, onSubmit }) {
  return (
    <section className="login page__login">
      <h2 className="login__title">{name === 'signup' ? 'Регистрация' : 'Вход'}</h2>
      <form name={name} onSubmit={onSubmit}>
        {children}
        <button className="login__submit-button" type="submit">{name === 'signup' ? 'Регистрация' : 'Войти'}</button>
      </form>
      {name === 'signup' ? <p className="login__subtitle">Уже зарегистрированы? <Link to='/sign-in' className="login__subtitle_type_link">Войти</Link></p> : <p className="login__subtitle"></p>}      
    </section>
  );
};

export default SectionLogin;