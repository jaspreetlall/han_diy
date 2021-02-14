import React, { useState, useEffect } from 'react';
import './IdeaCreate.scss';
import CancelIcon from '../../assets/icons/cancel-white-48dp.svg';
import AddIcon from '../../assets/icons/create-white-48dp.svg';
import ImageSearchModal from '../ImageSearchModal/ImageSearchModal';
import fire from '../../Firebase/Fire';

function IdeaCreate(props) {

  // Setting page title
  useEffect(() => {
    document.title = "Han-DIY | Create";
  }, []);

  const [ formData, setFormData ] = useState({
    userId: props.userId,
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
  const [ imageUrl, setImageUrl ] = useState('');
  const [ previewImageUrl, setPreviewImageUrl ] = useState('');
  const [ displaySearchModal, setDisplaySearchModal ] = useState(false);


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
    const db = fire.firestore();
    db
    .collection("ideas")
    // Adding the idea key value pairs
    .add({
      userId: formData.userId,
      title: formData.title,
      imageUrl: formData.imageUrl || 'https://unsplash.com/photos/82TpEld0_e4/download?force=true&w=640',
      description: formData.description,
      category: formData.category,
      tools: (formData.tools).split(', '),
      parts: (formData.parts).split(', '),
      link: formData.link,
      notes: formData.notes,
      timestamp: Date.now()
    })
    .then(() => props.history.push(`/ideas`))
    .catch((err) => console.log(err));
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
  
  // Button handler to trigger image search modal
  const searchModalButtonHandler = () => {
    setDisplaySearchModal(true);
  }
  
  // Cancel button handler
  // to hide search image modal
  const cancelImageSearchButtonHandler = () => {
    setDisplaySearchModal(false);
  }
  
  // Click handler to be used by search modal
  // when image is clicked upon
  const imageClickHandler = (imageId) => {
    let imageUrlFromModal = `https://unsplash.com/photos/${imageId}/download?force=true&w=1920`
    setFormData(prev => ({...prev, imageUrl: imageUrlFromModal}))
    setImageUrl(imageUrlFromModal);
    // Setting lower resolution image for thumbnail
    setPreviewImageUrl(`https://unsplash.com/photos/${imageId}/download?force=true&w=640`)
    setDisplaySearchModal(false);
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
          <div className="create__block-form-input create__block-form-input--search">
            <label className="create__block-form-input-label" htmlFor="title">Cover image</label>
            <button
              className="create__block-form-input-button create__block-form-input-button--search"
              onClick={searchModalButtonHandler}
              type="button">Search cover image</button>
            {/* Displaying thumbnail only if image is choosen by the user
                and the url is set in the state
            */}
            {
              imageUrl
              ? <div className="create__block-form-input-thumbnail">
                  <img className="create__block-form-input-thumbnail-img" src={previewImageUrl} alt="Cover thumbnail"/>
                </div>
              : <div></div>
            }
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
              <option value="">Choose category</option>
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
      <div className={displaySearchModal ? "search-modal--show" : "search-modal--hidden"}>
        <ImageSearchModal
          imageClickHandler={imageClickHandler}
          cancelImageSearchButtonHandler={cancelImageSearchButtonHandler}
        />
      </div>
    </section>
  )
}

export default IdeaCreate
