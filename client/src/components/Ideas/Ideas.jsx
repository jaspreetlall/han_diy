import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './Ideas.scss';
import EditIcon from '../../assets/icons/edit-white-48dp.svg';
import ViewIcon from '../../assets/icons/view-white-48dp.svg';

const ideasURL = "http://localhost:8080/idea/"

class Ideas extends Component {

  state = {
    ideaArray: []
  }

  componentDidMount() {
    Axios
    .get(ideasURL)
    .then((res) => {
      this.setState({
        ideaArray: res.data
      })
    })
    .catch((err) => console.log(err));
  }

  render() {
    // Check if the array has been loaded into the state
    if (this.state.ideaArray.length !== 0) {
      return (
        <section className="ideas">
          <div className="ideas__block container">
            <h2 className="ideas__block-title">Saved ideas</h2>
            {/* Rendering card per idea from ideaArray */}
            {this.state.ideaArray.map((idea) => {
              return (
                <div
                  className="ideas__block-card"
                  key={idea.id}
                  style={{
                    background: `linear-gradient(270deg, #ffffff 55%, rgba(255, 255, 255, 0) 100%), url(${idea.imageUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  <div className="ideas__block-card-info">
                    <h3 className="ideas__block-card-info-title">{idea.title}</h3>
                    <span
                      // Toggling classes based on idea status
                      // Dynamic value for status based on idea status
                      // -- true => completed idea
                      // -- false => pending idea
                      className={ idea.done
                        ? "ideas__block-card-info-status ideas__block-card-info-status--complete"
                        : "ideas__block-card-info-status" }
                      >{(idea.done) ? "Completed" : "Pending" }
                    </span>
                  </div>
                  <div className="ideas__block-card-links">
                    <Link className="ideas__block-card-links-icon" to={`/idea/${idea.id}/edit`}>
                      <img className="ideas__block-card-links-icon-img" src={EditIcon} alt="Edit icon"/>
                    </Link>
                    <Link className="ideas__block-card-links-icon ideas__block-card-links-icon--view" to={`/idea/${idea.id}/details`}>
                      <img className="ideas__block-card-links-icon-img" src={ViewIcon} alt="View icon"/>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )
    } else {
      return (
        <section className="ideas">
          <div className="ideas__block container">
            <h2 className="ideas__block-title">Please wait...</h2>
          </div>
        </section>
      )
    }
  }
}

export default Ideas;