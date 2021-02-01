import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss';
import CreateIcon from '../../assets/icons/create-white-48dp.svg';
import ViewIcon from '../../assets/icons/view-white-48dp.svg';
import AboutIcon from '../../assets/icons/contact-white-48dp.svg';

function Nav() {
  return (
    <nav className="nav">
      <div className="nav__block container">
        <NavLink 
          className="nav__block-link"
          activeClassName="nav__block-link--active"
          to="/idea/create">
          <div className="nav__block-link-icon">
            <img className="nav__block-link-icon-img" src={CreateIcon} alt="create"/>
          </div>
          <span className="nav__block-link-text">Create</span>
        </NavLink>
        <NavLink 
          className="nav__block-link"
          activeClassName="nav__block-link--active"
          to="/ideas">
          <div className="nav__block-link-icon">
            <img className="nav__block-link-icon-img" src={ViewIcon} alt="view"/>
          </div>
          <span className="nav__block-link-text">View</span>
        </NavLink>
        <NavLink 
          className="nav__block-link"
          activeClassName="nav__block-link--active"
          to="/about">
          <div className="nav__block-link-icon">
            <img className="nav__block-link-icon-img" src={AboutIcon} alt="about"/>
          </div>
          <span className="nav__block-link-text">About</span>
        </NavLink>
      </div>
    </nav>
  )
}

export default Nav
