import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import TextClamp from 'react-string-clamp';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import EditIcon from '../../assets/icons/edit-white-48dp.svg';
import DeleteIcon from '../../assets/icons/delete-white-48dp.svg';
import './IdeaDetails.scss';

const ideaUrl = "http://localhost:8080/idea/";

function IdeaDetails(props) {

  const requestedIdeaId = props.match.params.id;

  const [ idea, setIdea ] = useState({});
  const [ displayModal, setDisplayModal ] = useState(false);

  const deleteButtonHandler = () => {
    setDisplayModal(true);
  }

  const cancelButtonHandler = () => {
    setDisplayModal(false);
  }

  useEffect(() => {
    const apiFetchCall = async () => {
      await Axios
      .get(`${ideaUrl}${requestedIdeaId}`)
      .then((res) => setIdea(res.data))
      .catch((err) => console.log(err));
    };
    apiFetchCall();
    console.log("useEffect")
  }, [requestedIdeaId]);

  // TODO - Delete Button functionality
  // TODO - Change status button functionality

  // TODO - FIX DATE CONVERSION
  // Converting timestamp to a human readable date
  let utcDate = (new Date(idea.timestamp)).toLocaleDateString('en-US');

  if(idea.id) {
    return (
      <>
        <article className="idea">
          <div className="idea__card container">
            <header
              className="idea__card-header"
              style={{backgroundImage: `url(${idea.imageUrl})`}}>
              {/* Clamping the title to handle long idea titles */}
              <TextClamp
                className="idea__card-header-title"
                element="h1"
                text={idea.title}
                lines="2"
              />
            </header>
            <main className="idea__card-body">
              <div className="idea__card-body-detail">
                <h3 className="idea__card-body-detail-title">Description:</h3>
                <p className="idea__card-body-detail-para">{idea.description}</p>
              </div>
              <div className="idea__card-body-detail">
                <h3 className="idea__card-body-detail-title">Tools:</h3>
                {/* Displaying array as a comma separated string */}
                <p className="idea__card-body-detail-para">{(idea.tools).join(", ")}</p>
              </div>
              <div className="idea__card-body-detail">
                <h3 className="idea__card-body-detail-title">Parts:</h3>
                {/* Displaying array as a comma separated string */}
                <p className="idea__card-body-detail-para">{(idea.parts).join(", ")}</p>
              </div>
              <div className="idea__card-body-detail">
                <h3 className="idea__card-body-detail-title">Notes:</h3>
                <p className="idea__card-body-detail-para">{idea.notes}</p>
              </div>
              <div className="idea__card-body-detail">
                <h3 className="idea__card-body-detail-title">Reference link:</h3>
                <a className="idea__card-body-detail-para" href={idea.link}>{idea.link}</a>
              </div>
              <div className="idea__card-body-detail idea__card-body-detail--single-line">
                <h3 className="idea__card-body-detail-title">Category:</h3>
                <p className="idea__card-body-detail-para">{idea.category}</p>
              </div>
              <div className="idea__card-body-detail idea__card-body-detail--single-line">
                <h3 className="idea__card-body-detail-title">Status:</h3>
                <p className="idea__card-body-detail-para">{idea.done ? "Completed" : "Pending"}</p>
              </div>
              <div className="idea__card-body-detail idea__card-body-detail--single-line">
                <h3 className="idea__card-body-detail-title">Added:</h3>
                <p className="idea__card-body-detail-para">{utcDate}</p>
              </div>
            </main>
          </div>
          <div className="idea__actions container">
            <button
              className="idea__actions-button idea__actions-button--delete"
              onClick={deleteButtonHandler}>
              <img className="idea__actions-button-icon" src={DeleteIcon} alt="Delete icon"/>
            </button>
            <Link className="idea__actions-button" to={`/idea/${idea.id}/edit`}>
              <img className="idea__actions-button-icon" src={EditIcon} alt="Edit icon"/>
            </Link>
            <button className={idea.done ? "idea__actions-button idea__actions-button--status" : "idea__actions-button idea__actions-button--status idea__actions-button--status-pending"}>Change Status</button>
          </div>
        </article>
        <div className={displayModal ? "delete-modal--show" : "delete-modal--hidden"}>
          <DeleteConfirmation
            cancelButtonHandler={cancelButtonHandler}
            ideaId={idea.id}
          />
        </div>
      </>
    )
  } else {
    return (
      <article className="idea">
        <div className="idea__card container">
          <header
            className="idea__card-header">
            <TextClamp
              className="idea__card-header-title"
              element="h1"
              text="Loading"
              lines="2"
            />
          </header>
          <main className="idea__card-body">
            <div className="idea__card-body-detail">
              <h3 className="idea__card-body-detail-title">Description:</h3>
              <p className="idea__card-body-detail-para">Loading...</p>
            </div>
            <div className="idea__card-body-detail">
              <h3 className="idea__card-body-detail-title">Tools:</h3>
              <p className="idea__card-body-detail-para">Loading...</p>
            </div>
            <div className="idea__card-body-detail">
              <h3 className="idea__card-body-detail-title">Parts:</h3>
              <p className="idea__card-body-detail-para">Loading...</p>
            </div>
            <div className="idea__card-body-detail">
              <h3 className="idea__card-body-detail-title">Notes:</h3>
              <p className="idea__card-body-detail-para">Loading...</p>
            </div>
            <div className="idea__card-body-detail">
              <h3 className="idea__card-body-detail-title">Reference link:</h3>
              <a className="idea__card-body-detail-para" href="/">Loading...</a>
            </div>
            <div className="idea__card-body-detail idea__card-body-detail--single-line">
              <h3 className="idea__card-body-detail-title">Category:</h3>
              <p className="idea__card-body-detail-para">Loading...</p>
            </div>
            <div className="idea__card-body-detail idea__card-body-detail--single-line">
              <h3 className="idea__card-body-detail-title">Status:</h3>
              <p className="idea__card-body-detail-para">Loading...</p>
            </div>
            <div className="idea__card-body-detail idea__card-body-detail--single-line">
              <h3 className="idea__card-body-detail-title">Added:</h3>
              <p className="idea__card-body-detail-para">Loading...</p>
            </div>
          </main>
        </div>
        <div className="idea__actions container">
          <button className="idea__actions-button idea__actions-button--delete">
            <img className="idea__actions-button-icon" src={DeleteIcon} alt="Delete icon"/>
          </button>
          <Link className="idea__actions-button" to={`/idea/${idea.id}/edit`}>
            <img className="idea__actions-button-icon" src={EditIcon} alt="Edit icon"/>
          </Link>
          <button className="idea__actions-button idea__actions-button--status">Change Status</button>
        </div>
      </article>
    )
  }
}

export default IdeaDetails
