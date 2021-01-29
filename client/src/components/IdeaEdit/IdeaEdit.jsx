import React from 'react';
import './IdeaEdit.scss';
import CancelIcon from '../../assets/icons/cancel-white-48dp.svg';
import SaveIcon from '../../assets/icons/done-white-48dp.svg';

function IdeaEdit() {

  const categories =
  [
    "Build",
    "Craft",
    "Decorate",
    "Paint",
    "Repair",
    "Upcycle",
    "Other"
  ];

  // TODO - implement edit idea functionality 
  // TODO - pre-fill input fields, ready to edit
  // TODO - add form validation

  return (
    <section className="edit">
      <div className="edit__block container">
        <h2 className="edit__block-title">Edit idea</h2>
        <form className="edit__block-form" id="editForm">
          <div className="edit__block-form-input">
            <label className="edit__block-form-input-label" htmlFor="title">Title</label>
            <input
              className="edit__block-form-input-field"
              type="text"
              id="title"
              name="title"
              placeholder="Title for your idea"
            />
          </div>
          <div className="edit__block-form-input">
            <label className="edit__block-form-input-label" htmlFor="category">Category</label>
            <select className="edit__block-form-input-field" name="category" id="category">
              <option selected="true" disabled="disabled">Select Category</option>
              {categories.map((category, index) => {
                return(
                  <option value={category} key={index}>{category}</option>
                )
              })}
            </select>
          </div>
          <div className="edit__block-form-input">
            <label className="edit__block-form-input-label" htmlFor="description">Description</label>
            <textarea
              className="edit__block-form-input-field edit__block-form-input-field--textarea"
              type="text"
              id="description"
              name="description"
              placeholder="Description of your idea"
            />
          </div>
          <div className="edit__block-form-input">
            <label className="edit__block-form-input-label" htmlFor="parts">Parts</label>
            <input
              className="edit__block-form-input-field"
              type="text"
              id="parts"
              name="parts"
              placeholder="Parts needed. Separate with commas."
            />
          </div>
          <div className="edit__block-form-input">
            <label className="edit__block-form-input-label" htmlFor="tools">Tools</label>
            <input
              className="edit__block-form-input-field"
              type="text"
              id="tools"
              name="tools"
              placeholder="Tools needed. Separate with commas."
            />
          </div>
          <div className="edit__block-form-input">
            <label className="edit__block-form-input-label" htmlFor="link">Reference link</label>
            <input
              className="edit__block-form-input-field"
              type="text"
              id="link"
              name="link"
              placeholder="External reference link"
            />
          </div>
          <div className="edit__block-form-input">
            <label className="edit__block-form-input-label" htmlFor="notes">Additional notes</label>
            <textarea
              className="edit__block-form-input-field edit__block-form-input-field--textarea"
              type="text"
              id="notes"
              name="notes"
              placeholder="Additional reference notes"
            />
          </div>
          <div className="edit__block-form-input edit__block-form-input--buttons">
            <button type="button" className="edit__block-form-input-button">
              <img className="edit__block-form-input-button-icon" src={CancelIcon} alt="Cancel icon"/>
              <span className="edit__block-form-input-button-text">Cancel</span>
            </button>
            <button type="submit" className="edit__block-form-input-button edit__block-form-input-button--save">
              <img className="edit__block-form-input-button-icon" src={SaveIcon} alt="Add icon"/>
              <span className="edit__block-form-input-button-text">Save</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default IdeaEdit
