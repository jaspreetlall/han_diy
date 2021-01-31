import React, { useState, useEffect } from 'react';
import './IdeaCreate.scss';
import CancelIcon from '../../assets/icons/cancel-white-48dp.svg';
import AddIcon from '../../assets/icons/create-white-48dp.svg';
import Axios from 'axios';

const ideaUrl = "http://localhost:8080/idea/";

function IdeaCreate(props) {

  useEffect(() => {
    document.title = "Han-DIY | Create";
  }, []);

  const [ formData, setFormData ] = useState({
    userId: "2fc8e7ee-ee37-483f-93dc-116389646d4f",
    title: '',
    imageUrl: '',
    description: '',
    category: '',
    tools: '',
    parts: '',
    link: '',
    notes: ''
  })

  const [ disableAddButton, setDisableAddButton ] = useState(true);

  // Function to handle form input changes
  // and set values in state
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}))
    buttonStatus();
  }

  // Form submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    Axios
    .post(ideaUrl, formData)
    .then(res => setTimeout(() => {
      props.history.push(`/idea/${res.data.id}/details`)
    }, 500))
    .catch(err => console.log(err))
  }

  // Cancel handler
  const cancelButtonHandler = () => {
    props.history.goBack();
  }

  // Enable / Disable add button depending 
  // whether required fields have data
  const buttonStatus = () => {
    if (formData.title && formData.category && formData.description) {
      setDisableAddButton(false);
    } else {
      setDisableAddButton(true);
    }
  }

  return (
    <section className="create">
      <div className="create__block container">
        <h2 className="create__block-title">Create new idea</h2>
        <form
          className="create__block-form"
          onSubmit={submitHandler}
          id="createForm"
        >
          <div className="create__block-form-input">
            <label className="create__block-form-input-label" htmlFor="title">Title</label>
            <input
              className="create__block-form-input-field"
              type="text"
              id="title"
              name="title"
              autoFocus
              value={formData.title}
              onChange={handleChange}
              onBlur={handleChange}
              placeholder="Title for your idea"/>
          </div>
          <div className="create__block-form-input">
            <label className="create__block-form-input-label" htmlFor="category">Category</label>
            <select
              className="create__block-form-input-field"
              name="category"
              value={formData.category}
              onChange={handleChange}
              onBlur={handleChange}
              id="category">
              <option value="">Choose Category</option>
              <option value="Build">Build</option>
              <option value="Craft">Craft</option>
              <option value="Decorate">Decorate</option>
              <option value="Paint">Paint</option>
              <option value="Repair">Repair</option>
              <option value="Upcycle">Upcycle</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="create__block-form-input">
            <label className="create__block-form-input-label" htmlFor="description">Description</label>
            <textarea
              className="create__block-form-input-field create__block-form-input-field--textarea"
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleChange}
              placeholder="Description of your idea"
            />
          </div>
          <div className="create__block-form-input">
            <label className="create__block-form-input-label" htmlFor="parts">Parts</label>
            <input
              className="create__block-form-input-field"
              type="text"
              id="parts"
              name="parts"
              value={formData.parts}
              onChange={handleChange}
              placeholder="Parts needed. Separate with commas."
            />
          </div>
          <div className="create__block-form-input">
            <label className="create__block-form-input-label" htmlFor="tools">Tools</label>
            <input
              className="create__block-form-input-field"
              type="text"
              id="tools"
              name="tools"
              value={formData.tools}
              onChange={handleChange}
              placeholder="Tools needed. Separate with commas."
            />
          </div>
          <div className="create__block-form-input">
            <label className="create__block-form-input-label" htmlFor="link">Reference link</label>
            <input
              className="create__block-form-input-field"
              type="text"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="External reference link"
            />
          </div>
          <div className="create__block-form-input">
            <label className="create__block-form-input-label" htmlFor="notes">Additional notes</label>
            <textarea
              className="create__block-form-input-field create__block-form-input-field--textarea"
              type="text"
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional reference notes"
            />
          </div>
          <div className="create__block-form-input create__block-form-input--buttons">
            <button
              className="create__block-form-input-button"
              type="button"
              onClick={cancelButtonHandler}>
              <img className="create__block-form-input-button-icon" src={CancelIcon} alt="Cancel icon"/>
              <span className="create__block-form-input-button-text">Cancel</span>
            </button>
            <button
              type="submit"
              disabled={disableAddButton}
              className="create__block-form-input-button create__block-form-input-button--add">
              <img className="create__block-form-input-button-icon" src={AddIcon} alt="Add icon"/>
              <span className="create__block-form-input-button-text">Add</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default IdeaCreate
