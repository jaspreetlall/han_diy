import React, { useState } from 'react';
import Axios from 'axios';
import './KijijiSearchModal.scss';
import KijijiLogo from '../../assets/logos/Kijiji-Logo.svg';
import TextClamp from 'react-string-clamp';

// Component requires handler for cancel button
// as well as tools array to be passed as props

function KijijiSearchModal({cancelButtonHandler, tools}) {

  // Search term to search tools on Kijiji
  const [ searchTool, setSearchTool ] = useState('');
  // Search results from kijiji scraper
  const [ searchResultsArray, setSearchResultsArray ] = useState([]);

  // Tool search button handler
  const toolSearchButtonHandler = (searchTerm) => {
    setSearchTool(searchTerm)
    Axios
    .get(`http://localhost:8080/kijiji/?search=${searchTerm}`)
    .then((res) => setSearchResultsArray(res.data))
    .catch(err => console.log(err))
  }

  // Function to toggle classes on tool search
  // buttons depending on current search term set
  const toggleSearcButtonClass = (buttonSearchTerm) => {
    if(searchTool === buttonSearchTerm) {
      return ("kijiji-search__block-search-term kijiji-search__block-search-term--current")
    } else {
      return ("kijiji-search__block-search-term")
    }
  }

  return (
    <div className="kijiji-search">
      <div className="kijiji-search__block container">
        <div className="kijiji-search__block-message">
          <h3 className="kijiji-search__block-message-title">
            <img className="kijiji-search__block-message-title-logo" src={KijijiLogo} alt="Kijiji"/>
          </h3>
          <p className="kijiji-search__block-message-para">Quick search local listings for tools</p>
        </div>
        <div className="kijiji-search__block-search">
          {/* Returning the 'search term' buttons from the tools array */}
          {
            tools.map((tool, index) => {
              return (
                <button
                  className={toggleSearcButtonClass(tool)}
                  key={index}
                  onClick={() => toolSearchButtonHandler(tool)}>{tool}
                </button>
              )
            })
          }
        </div>
        <ul className="kijiji-search__block-results">
          {/* Returning list items for each search result from Kijiji */}
          {
            searchResultsArray.map((ad, index) => {
              return (
                <li
                  className="kijiji-search__block-results-item"
                  key={index}>
                  <a
                    className="kijiji-search__block-results-item-link"
                    href={ad.url}
                    target="_blank"
                    rel="noopener noreferrer">
                    <div className="kijiji-search__block-results-item-link-wrapper">
                      <img className="kijiji-search__block-results-item-link-wrapper-img" src={ad.image} alt=""/>
                    </div>
                    <div className="kijiji-search__block-results-item-link-desc">
                      <TextClamp
                        className="kijiji-search__block-results-item-link-desc-title"
                        element="h4"
                        text={ad.title}
                        lines="2"
                      />
                      <span className="kijiji-search__block-results-item-link-desc-price">{`$ ${ad.attributes.price}`}</span>
                    </div>
                  </a>
                </li>
              )
            })
          }
        </ul>
        <div className="kijiji-search__block-button">
          <button
            className="kijiji-search__block-button-back"
            onClick={cancelButtonHandler}>Go back
          </button>
        </div>
      </div>
    </div>
  )
}

export default KijijiSearchModal
