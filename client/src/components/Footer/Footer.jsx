import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.scss';
import CreateIcon from '../../assets/icons/create-white-48dp.svg';
import ViewIcon from '../../assets/icons/view-white-48dp.svg';
import AboutIcon from '../../assets/icons/contact-white-48dp.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__block container">
        <NavLink 
          className="footer__block-link"
          activeClassName="footer__block-link--active"
          to="/idea/create">
          <div className="footer__block-link-icon">
            <img className="footer__block-link-icon-img" src={CreateIcon} alt="create"/>
          </div>
          <span className="footer__block-link-text">Create</span>
        </NavLink>
        <NavLink 
          className="footer__block-link"
          activeClassName="footer__block-link--active"
          to="/ideas">
          <div className="footer__block-link-icon">
            <img className="footer__block-link-icon-img" src={ViewIcon} alt="view"/>
          </div>
          <span className="footer__block-link-text">View</span>
        </NavLink>
        <NavLink 
          className="footer__block-link"
          activeClassName="footer__block-link--active"
          to="/about">
          <div className="footer__block-link-icon">
            <img className="footer__block-link-icon-img" src={AboutIcon} alt="about"/>
          </div>
          <span className="footer__block-link-text">About</span>
        </NavLink>
      </div>
    </footer>
  )
}

export default Footer
