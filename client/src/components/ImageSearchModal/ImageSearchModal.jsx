import React, { useState, useEffect } from 'react';
import './ImageSearchModal.scss';
import Axios from 'axios';

const unsplashApiKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const apiUrl = "https://api.unsplash.com/search/photos";

function ImageSearchModal({ imageClickHandler, closeSearchHandler }) {

  const [ searchTerm, setSearchTerm ] = useState('');
  const [ imageArray, setImageArray ] = useState([])

  // Image search API call to Unsplash
  useEffect(() => {
    const apiFetchCall = async () => {
      await Axios
      .get(`${apiUrl}?page=1&query=${searchTerm}&client_id=${unsplashApiKey}`)
      .then((res) => {
        setImageArray(res.data.results);
      })
      .catch((err) => console.log(err));
    };
    apiFetchCall();
  }, [searchTerm]);

  // Handler for search form
  const submitHandler = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.search.value);
  }

  return (
    <div className="img-search">
      <div className="img-search__block container">
        <form
          className="img-search__block-form"
          onSubmit={submitHandler}>
          <div className="img-search__block-form-input">
            <label className="img-search__block-form-input-label" htmlFor="title">Tap on image, then hit close to save</label>
            <input
              className="img-search__block-form-input-field"
              type="text"
              id="search"
              name="search"
              autoFocus
              placeholder="Search for image"/>
          </div>
          <div className="img-search__block-form-input--buttons">
            <button
              className="img-search__block-form-button img-search__block-form-button--close"
              onClick={closeSearchHandler} type="button">Close</button>
            <button
              className="img-search__block-form-button img-search__block-form-button--search"
              type="submit">Search</button>
          </div>
        </form>
        <div className="img-search__block-images">
          {
            imageArray.map((image) => {
              return (
                <div
                  className="img-search__block-images-wrapper"
                  key={image.id}>
                  <img
                    className="img-search__block-images-wrapper-img"
                    onClick={() => imageClickHandler(image.id)}
                    src={image.urls.regular}
                    alt="thumbnail"/>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default ImageSearchModal
