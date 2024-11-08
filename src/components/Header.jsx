import React from 'react';
import { Link } from 'react-router-dom';
import style from '../css/common.module.css';

const Header = () => {
  return (
    <header className={style.header}>
      <h1>
        <Link to='/'>
          <img src='/img/logo.png' alt='logo' />
        </Link>
        SeoulLibro
      </h1>
      <div className={style.btnCon}>
        <Link to='/' className={style.signupBtn}>
          Sign Up
        </Link>
        <Link to='/' className={style.loginBtn}>
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
