import React, { useEffect } from 'react';
import './Home.scss';

function Home() {

  useEffect(() => {
    document.title = "Han-DIY | Home";
  }, []);

  return (
    <section className="home">
      <div className="home__block">
        <div className="home__block-hero">
          <h1 className="home__block-hero-title container">Do. It.<br/> Yourself.</h1>
        </div>
        <div className="home__block-body container">
          <h2 className="home__block-body-title">Get started</h2>
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
