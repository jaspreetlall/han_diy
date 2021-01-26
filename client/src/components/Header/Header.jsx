import React from 'react';
import { Link } from 'react-router-dom';
import AppLogo from '../../assets/logos/logo-light.svg';
import UserIcon from '../../assets/icons/user-white-48dp.svg';
import './Header.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="header__block container">
        <Link to="/" className="header__block-logo">
          <img className="header__block-logo-img" src={AppLogo} alt="Han-DIY logo"/>
        </Link>
        <Link to="/" className="header__block-appname">Han-DIY</Link>
        <div className="header__block-user">
          <img className="header__block-user-img" src={UserIcon} alt="User icon"/>
        </div>
      </div>
    </header>
  )
}
