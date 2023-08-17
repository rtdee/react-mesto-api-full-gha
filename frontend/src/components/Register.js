import React from "react";
import { Link } from "react-router-dom";

function Register (props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailInput(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit({email, password});
  }

  return (
    <div className="signup-screen">
      <div className="signup-screen__container">
        <h2 className="signup-screen__title">Регистрация</h2>
        <form className="signup-form" name="signupform" noValidate onSubmit={handleSubmit}>
          <input
          className="signup-form__input signup-form__input_type_email"
          type="email"
          id="email-input"
          name="email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="30"
          value={email}
          onChange={handleEmailInput}
          />
          <input
          className="signup-form__input signup-form__input_type_password"
          type="password"
          id="password-input"
          name="password"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="30"
          value={password}
          onChange={handlePasswordInput}
          />
          <button className="signup-form__submit-button" type="submit">Зарегистрироваться</button>
        </form>
        <p className="paragraph">Уже зарегистрированы? <Link className="link link_location_register" to="/login">Войти</Link></p>
      </div>
    </div>
  )
}

export default Register;