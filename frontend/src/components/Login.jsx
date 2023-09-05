import SectionLogin from "./SectionLogin";
import {useState} from 'react';


function Login ({name, handleLogin}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  };

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  };

  function onLogin(evt) {
    evt.preventDefault();
    handleLogin({
      password: password, 
      email: email,
    });
  };

  return (
    <SectionLogin name={name} onSubmit={onLogin}>
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

export default Login;