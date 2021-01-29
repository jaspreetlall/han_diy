import React, { useState } from 'react';
import './IdeaCreate.scss';
import CancelIcon from '../../assets/icons/cancel-white-48dp.svg';
import AddIcon from '../../assets/icons/create-white-48dp.svg';
import Axios from 'axios';

const ideaUrl = "http://localhost:8080/idea/";

// TODO - Redirect to idea after creating.

function IdeaCreate(props) {

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

  const [formData, setFormData] = useState({
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

  const submitHandler = (e) => {
    e.preventDefault();
    Axios
    .post(ideaUrl, formData)
    .then(props.history.push('/'))
    .catch(err => console.log(err))
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}))
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
              required
              autoFocus
              value={formData.title}
              onChange={handleChange}
              placeholder="Title for your idea"/>
          </div>
          <div className="create__block-form-input">
            <label className="create__block-form-input-label" htmlFor="category">Category</label>
            <select
              className="create__block-form-input-field"
              name="category"
              value={formData.category}
              onChange={handleChange}
              id="category">
              {categories.map((category, index) => {
                return(
                  <option value={category} key={index}>{category}</option>
                )
              })}
            </select>
          </div>
          <div className="create__block-form-input">
            <label className="create__block-form-input-label" htmlFor="description">Description</label>
            <textarea
              className="create__block-form-input-field create__block-form-input-field--textarea"
              type="text"
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
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
            <button type="button" className="create__block-form-input-button">
              <img className="create__block-form-input-button-icon" src={CancelIcon} alt="Cancel icon"/>
              <span className="create__block-form-input-button-text">Cancel</span>
            </button>
            <button type="submit" className="create__block-form-input-button create__block-form-input-button--add">
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
