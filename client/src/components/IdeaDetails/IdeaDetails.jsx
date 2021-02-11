import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TextClamp from 'react-string-clamp';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import EditIcon from '../../assets/icons/edit-white-48dp.svg';
import DeleteIcon from '../../assets/icons/delete-white-48dp.svg';
import './IdeaDetails.scss';
import fire from '../../Firebase/Fire';

function IdeaDetails(props) {
  
  const [ idea, setIdea ] = useState({});
  const [ displayModal, setDisplayModal ] = useState(false);

  // Setting page title
  useEffect(() => {
    document.title = (idea.title) ? `Han-DIY | ${idea.title}` : `Han-DIY | Please Wait...`;
  }, [idea.title]);
  
  const requestedIdeaId = props.match.params.id;
  
  // Delete button handler
  // to display confirmation modal
  const deleteButtonHandler = () => {
    setDisplayModal(true);
  }

  // Cancel button handler
  // to hide confirmation modal
  const cancelButtonHandler = () => {
    setDisplayModal(false);
  }

  // Getting idea details from firestore
  useEffect(() => {
    const fetchData = async () => {
      const db = fire.firestore();
      db
      .collection("ideas")
      // Matching firestore document id
      // with requestedIdeaId
      .doc(requestedIdeaId)
      .onSnapshot((querySnapshot) => {
        // Setting idea state with received data
        setIdea({
          ...querySnapshot.data(),
          // Adding document id as the idea id
          // into idea object in the state
          id: querySnapshot.id,
          // Overwriting the timestamp in idea object
          // after converting into milliseconds
          timestamp: querySnapshot.data().timestamp.toMillis()
        });
      })
    }
    fetchData();
  }, [requestedIdeaId])


  // Function used by confirmation modal component
  // to make firestore delete call.
  const deleteConfirmationHandler = () => {
    console.log("delete request")
    const db = fire.firestore();
    db
    .collection("ideas")
    // Matching firestore document/idea
    // id with requestedIdeaId
    .doc(requestedIdeaId)
    // Deleting the requested document/idea
    // from firestore
    .delete()
    .then(() => props.history.push(`/ideas`))
    .catch((err) => console.log(err));
  }

  // Function to update the "Done" status
  // when change status button is clicked
  const changeStatusHandler = () => {
    const db = fire.firestore();
    db
    .collection("ideas")
    // Matching firestore document id
    // with requestedIdeaId
    .doc(requestedIdeaId)
    // Updating the done status
    .update({ done: !idea.done})
    .catch((err) => console.log(err));
  }

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
            <button
              onClick={changeStatusHandler}
              className={
                idea.done
                ? "idea__actions-button idea__actions-button--status"
                : "idea__actions-button idea__actions-button--status idea__actions-button--status-pending"
              }>Change Status
            </button>
          </div>
        </article>
        <div className={displayModal ? "delete-modal--show" : "delete-modal--hidden"}>
          <DeleteConfirmation
            cancelButtonHandler={cancelButtonHandler}
            deleteConfirmationHandler={deleteConfirmationHandler}
          />
        </div>
      </>
    )
  } else {
    return (
      <article className="idea">
        <div className="idea__card container">
          <header className="idea__card-header">
            <h2 className="idea__card-header-title">Please wait...</h2>
          </header>
        </div>
      </article>
    )
  }
}

export default IdeaDetails