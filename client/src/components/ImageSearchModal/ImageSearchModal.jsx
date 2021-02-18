import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import UnsplashLogo from '../../assets/logos/Unsplash_Logo.png';
import './ImageSearchModal.scss';

const unsplashApiKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const apiUrl = "https://api.unsplash.com/search/photos";

function ImageSearchModal({cancelImageSearchButtonHandler, imageClickHandler}) {

  const [ searchTerm, setSearchTerm ] = useState('');
  const [ imageArray, setImageArray ] = useState([])

  // Image search API call to Unsplash
  useEffect(() => {
    const apiFetchCall = () => {
      Axios
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
    window.scrollTo(0,0);
  }

  return (
    <div className="img-search">
      <div className="img-search__block container">
        <h3 className="img-search__block-title">
          <img className="img-search__block-title-logo" src={UnsplashLogo} alt="Unsplash"/>
        </h3>
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
        <form
          className="img-search__block-form"
          onSubmit={submitHandler}>
          <div className="img-search__block-form-input">
            <label className="img-search__block-form-input-label" htmlFor="title">Tap on image to set cover photo</label>
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
              className="img-search__block-form-button"
              type="button"
              onClick={cancelImageSearchButtonHandler}>Cancel
            </button>
            <button
              className="img-search__block-form-button img-search__block-form-button--search"
              type="submit">Search
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ImageSearchModal
