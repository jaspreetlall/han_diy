import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import { FireAuthContext } from "../../Firebase/AuthProvider";


function Home() {
  // Setting page title
  useEffect(() => {
    document.title = "Han-DIY | Home";
  }, []);
  
  // Getting user from context to check logged in status
  // for not showing login/signup buttons if logged in.
  const {currentUser} = useContext(FireAuthContext);

  return (
    <section className="home">
      <div className="home__block">
        <div className="home__block-hero">
          <h1 className="home__block-hero-title container">Do. It.<br/> Yourself.</h1>
        </div>
        <div className="home__block-body container">
          <h2 className="home__block-body-title">Get started</h2>
          {/* Displaying the links to login and signup only if
              the user is not logged in
          */}
          { !currentUser
              ? <div className="home__block-body-para home__block-body-para--links">
                  <Link className="home__block-body-para-link" to="/signup">Sign up</Link>
                  <Link className="home__block-body-para-link home__block-body-para-link--login" to="/login">Log in</Link>
                </div>
              : <div></div>
          }
          <div className="home__block-body-para">
            <h3 className="home__block-body-para-title">Create</h3>
            <p className="home__block-body-para-text">Save your do-it-yourself ideas to Han-DIY to keep them handy.</p>
          </div>
          <div className="home__block-body-para">
            <h3 className="home__block-body-para-title">View</h3>
            <p className="home__block-body-para-text">Peep into your saved ideas for a list of parts, tools or additional notes to get you going.</p>
          </div>
          <div className="home__block-body-para">
            <h3 className="home__block-body-para-title">Complete</h3>
            <p className="home__block-body-para-text">Mark your ideas as complete when you turn those into real world projects.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
