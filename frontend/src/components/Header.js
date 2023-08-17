import headerLogoPic from '../images/header-logo.svg';
import React from 'react';
import { useLocation, Link } from "react-router-dom";

function Header(props) {
  const location = useLocation();
  const [headerElement, setHeaderElement] = React.useState(<></>);
  React.useEffect(() => {
    if (location.pathname === "/signup") {
      setHeaderElement(<Link className="link link_location_header" to="/login">Войти</Link>)
    } else if (location.pathname === "/login") {
      setHeaderElement(<Link className="link link_location_header" to="/signup">Регистрация</Link>)
    } else if (location.pathname === "/main") {
      setHeaderElement(<><p className='header__email'>{props.email}</p> <Link className="link link_location_header link_type_logout" to="/login" onClick={props.handleLogout}>Выйти</Link></>)
    }
  }, [location]);

  return (
    <header className="header">
      <img className="header__logo" src={headerLogoPic} alt="лого" />
      {headerElement}
    </header>
  );
}

export default Header;