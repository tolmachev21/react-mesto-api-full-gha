import SectionLogin from "./SectionLogin";
import { useState } from "react";


function Register({ name, handleRegister }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  };

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  };

  function onRegister(event) {
    event.preventDefault();
    handleRegister({
      password: password,
      email: email,
    });
  };

  return (
    <SectionLogin name={name} onSubmit={onRegister}>
      <input
        className="login__input"
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleChangeEmail}
      ></input>
      <input
        className="login__input"
        name="password"
        type="password"
        placeholder="Пароль"
        minLength={3}
        value={password}
        onChange={handleChangePassword}
      ></input>
    </SectionLogin>
  );
};

export default Register;