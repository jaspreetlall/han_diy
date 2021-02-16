import React from 'react';
import './SignoutConfirmation.scss';

// Component requires handlers for cancel & signout
// button to be passed as props

function SignoutConfirmation({cancelButtonHandler, signoutConfirmationHandler}) {
  return (
    <div className="signout">
      <div className="signout__block container">
        <div className="signout__block-message">
          <h3 className="signout__block-message-title">Sign out?</h3>
        </div>
        <div className="signout__block-buttons">
          <button
            className="signout__block-buttons-cancel"
            onClick={cancelButtonHandler}>Cancel
          </button>
          <button
            className="signout__block-buttons-signout"
            onClick={signoutConfirmationHandler}>Sign out
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignoutConfirmation
