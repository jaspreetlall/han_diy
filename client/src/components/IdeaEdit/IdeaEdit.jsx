import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './IdeaEdit.scss';
import CancelIcon from '../../assets/icons/cancel-white-48dp.svg';
import SaveIcon from '../../assets/icons/done-white-48dp.svg';

const ideaUrl = "http://localhost:8080/idea/";

// TODO - Redirect to idea after editing.
// TODO - Disable add button until required fields have data

function IdeaEdit(props) {

  const requestedIdeaId = props.match.params.id;

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

  // Form submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    Axios
    .put(`${ideaUrl}${requestedIdeaId}`, formData)
    .then(props.history.push('/'))
    .catch((err) => console.log(err));
  }

  // Initial load of data from api
  useEffect(() => {
    // Function to get data from api
    const apiFetchCall = async () => {
      await Axios
      .get(`${ideaUrl}${requestedIdeaId}`)
      .then((res) => {
        setFormData({  
          title: res.data.title,
          imageUrl: res.data.imageUrl,
          description: res.data.description,
          category: res.data.category,
          tools: res.data.tools.join(', '),
          parts: res.data.parts.join(', '),
          done: res.data.done,
          link: res.data.link,
          notes: res.data.notes,
          timestamp: res.data.timestamp,
        })
      })
      .catch((err) => console.log(err));
    };
    apiFetchCall();
  }, [requestedIdeaId]);

  // Function to handle form input changes
  // and set values in state
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}))
  }
  
  return (
    <section className="edit">
      <div className="edit__block container">
        <h2 className="edit__block-title">Edit idea</h2>
        <form
          className="edit__block-form"
          onSubmit={submitHandler}
          id="editForm">
          <div className="edit__block-form-input">
            <label className="edit__block-form-input-label" htmlFor="title">Title</label>
            <input
              className="edit__block-form-input-field"
              type="text"
              id="title"
              name="title"
              required
              autoFocus
              value={formData.title}
              onChange={handleChange}
              placeholder="Title for your idea"
            />
          </div>
          <div className="edit__block-form-input">
            <label className="edit__block-form-input-label" htmlFor="category">Category</label>
            <select
              className="create__block-form-input-field"
              name="category"
              value={formData.category}
              required
              onChange={handleChange}
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
          <div className="edit__block-form-input">
            <label className="edit__block-form-input-label" htmlFor="description">Description</label>
            <textarea
              className="edit__block-form-input-field edit__block-form-input-field--textarea"
              type="text"
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
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
              value={formData.parts}
              onChange={handleChange}
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
              value={formData.tools}
              onChange={handleChange}
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
              value={formData.link}
              onChange={handleChange}
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
              value={formData.notes}
              onChange={handleChange}
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
