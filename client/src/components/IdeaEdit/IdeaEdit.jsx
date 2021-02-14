import React, { useState, useEffect } from 'react';
import './IdeaEdit.scss';
import CancelIcon from '../../assets/icons/cancel-white-48dp.svg';
import SaveIcon from '../../assets/icons/done-white-48dp.svg';
import ImageSearchModal from '../ImageSearchModal/ImageSearchModal';
import fire from '../../Firebase/Fire';

function IdeaEdit(props) {

  // Setting page title
  useEffect(() => {
    document.title = "Han-DIY | Edit";
  }, []);

  const requestedIdeaId = props.match.params.id;

  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    description: '',
    category: '',
    tools: '',
    parts: '',
    link: '',
    notes: ''
  })

  const [ disableSaveButton, setDisableSaveButton ] = useState(true);
  const [ imageUrl, setImageUrl ] = useState('');	
  const [ previewImageUrl, setPreviewImageUrl ] = useState('');	
  const [ displaySearchModal, setDisplaySearchModal ] = useState(false);

  // Initial load of data from firestore
  useEffect(() => {
    const fetchData = fire
    .firestore()
    .collection("ideas")
    // Matching firestore document id
    // with requestedIdeaId
    .doc(requestedIdeaId)
    .onSnapshot((querySnapshot) => {
        // Setting idea state with received data
        setFormData({
          ...querySnapshot.data(),
          // Adding document id as the idea id
          // into idea object in the state
          id: querySnapshot.id,
          // Converting parts and tools array
          //  items into comma separated strings
          tools: querySnapshot.data().tools.join(', '),
          parts: querySnapshot.data().parts.join(', '),
        });
        setImageUrl(querySnapshot.data().imageUrl);
        setPreviewImageUrl(querySnapshot.data().imageUrl);
    }, (err) => console.log(err))
    return () => fetchData();
  }, [requestedIdeaId]);

  // Form submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    const db = fire.firestore();
    db
    .collection("ideas")
    // Matching firestore document/idea
    // id with requestedIdeaId
    .doc(requestedIdeaId)
    // Updating the idea key value pairs
    .update({
      title: formData.title,
      imageUrl: formData.imageUrl || 'https://unsplash.com/photos/82TpEld0_e4/download?force=true&w=640',
      description: formData.description,
      category: formData.category,
      tools: (formData.tools).split(', '),
      parts: (formData.parts).split(', '),
      link: formData.link,
      notes: formData.notes
    })
    .then(() => {
      props.history.push(`/ideas`);
    })
    .catch((err) => console.log(err));
  }

  // Cancel handler
  const cancelButtonHandler = () => {
    props.history.goBack();
  }

  // Function to handle form input changes
  // and set values in state
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}))
    buttonStatus();
  }

  // Enable / Disable save button depending 
  // whether required fields have data
  const buttonStatus = () => {
    if (formData.title && formData.category && formData.description) {
      setDisableSaveButton(false);
    } else {
      setDisableSaveButton(true);
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
              autoFocus
              value={formData.title}
              onChange={handleChange}
              onBlur={handleChange}
              placeholder="Title for your idea"
            />
          </div>
          <div className="edit__block-form-input edit__block-form-input--search">
            <label className="edit__block-form-input-label" htmlFor="title">Cover image</label>
            <button
              className="edit__block-form-input-button edit__block-form-input-button--search"
              onClick={searchModalButtonHandler}
              type="button">Search cover image</button>
            {/* Displaying thumbnail only if image is choosen by the user
                and the url is set in the state
            */}
            {
              imageUrl
              ? <div className="edit__block-form-input-thumbnail">
                  <img className="edit__block-form-input-thumbnail-img" src={previewImageUrl} alt="Cover thumbnail"/>
                </div>
              : <div></div>
            }
          </div>
          <div className="edit__block-form-input">
            <label className="edit__block-form-input-label" htmlFor="category">Category</label>
            <select
              className="edit__block-form-input-field"
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
          <div className="edit__block-form-input">
            <label className="edit__block-form-input-label" htmlFor="description">Description</label>
            <textarea
              className="edit__block-form-input-field edit__block-form-input-field--textarea"
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleChange}
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
            <button
              className="edit__block-form-input-button"
              type="button"
              onClick={cancelButtonHandler}>
              <img className="edit__block-form-input-button-icon" src={CancelIcon} alt="Cancel icon"/>
              <span className="edit__block-form-input-button-text">Cancel</span>
            </button>
            <button
              type="submit"
              disabled={disableSaveButton}
              className="edit__block-form-input-button edit__block-form-input-button--save">
              <img className="edit__block-form-input-button-icon" src={SaveIcon} alt="Save icon"/>
              <span className="edit__block-form-input-button-text">Save</span>
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

export default IdeaEdit
