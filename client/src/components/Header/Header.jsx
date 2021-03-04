import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FireAuthContext } from '../../Firebase/AuthProvider';
import SignoutConfirmation from '../SignoutConfirmation/SignoutConfirmation'
import AppLogo from '../../assets/logos/logo-light.svg';
import LogoutIcon from '../../assets/icons/logout-white-48dp.svg';
import fire from '../../Firebase/Fire';
import './Header.scss';

function Header() {

  // Getting current user from context
  const { currentUser } = useContext(FireAuthContext);
  
  // Saving state whether to display logout modal
  const [ displayModal, setDisplayModal ] = useState(false);
  
  // Signout button handler
  // to display confirmation modal
  const signoutButtonHandler = () => {
    setDisplayModal(true);
  }

  // Function used by confirmation modal component
  // to signout.
  const signoutConfirmationHandler = () => {
    fire.auth().signOut();
    setDisplayModal(false);
  }

  // Cancel button handler
  // to hide confirmation modal
  const cancelButtonHandler = () => {
    setDisplayModal(false);
  }


  return (
    <header className="header">
      <div className="header__block container">
        <Link to="/" className="header__block-logo">
          <img className="header__block-logo-img" src={AppLogo} alt="Han-DIY logo"/>
        </Link>
        <Link to="/" className="header__block-appname">Han-DIY</Link>
        <div className="header__block-logout">
          {/* Displaying signout button only if user is signed in */}
          {
            currentUser
            ? <button
                className="header__block-logout-button"
                onClick={signoutButtonHandler}>
                <img className="header__block-logout-button-img" src={LogoutIcon} alt="Logout icon"/>
              </button>
            : <></>
          }
        </div>
      </div>
      <div className={displayModal ? "signout-modal--show" : "signout-modal--hidden"}>
          <SignoutConfirmation
            cancelButtonHandler={cancelButtonHandler}
            signoutConfirmationHandler={signoutConfirmationHandler}
          />
        </div>
    </header>
  )
}

export default Header;
