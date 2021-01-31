import React from 'react';
import './DeleteConfirmation.scss';

// Component requires handlers for cancel & delete
// button to be passed as props

function DeleteConfirmation({cancelButtonHandler, deleteConfirmationHandler}) {
  return (
    <div className="modal">
      <div className="modal__block container">
        <div className="modal__block-message">
          <h3 className="modal__block-message-title">Delete idea?</h3>
          <p className="modal__block-message-para">This action cannot be undone.</p>
        </div>
        <div className="modal__block-buttons">
          <button
            className="modal__block-buttons-cancel"
            onClick={cancelButtonHandler}>Keep
          </button>
          <button
            className="modal__block-buttons-delete"
            onClick={deleteConfirmationHandler}>Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmation
