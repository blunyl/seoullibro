import React from 'react';
import { Link } from 'react-router-dom';
import style from '../css/Header.module.css';

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
        <Link to='/' className={style.aboutBtn}>
          About
        </Link>
        <Link to='/' className={style.mapBtn}>
          Map
        </Link>
      </div>
    </header>
  );
};

export default Header;
