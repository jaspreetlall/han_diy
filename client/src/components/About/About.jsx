import React from 'react';
import './About.scss';
import AppIcon from '../../assets/icons/about-app.png';
import GitHubIcon from '../../assets/icons/GitHub-Mark-120px-plus.png';
import LinkedInIcon from '../../assets/icons/LI-In-Bug.png';

function About() {
  return (
    <article className="about">
      <div className="about__block container">
        <div className="about__block-app">
          <div className="about__block-app-logo">
            <img className="about__block-app-logo-img" src={AppIcon} alt="Han-DIY logo"/>
          </div>
          <div className="about__block-app-info">
            <h2 className="about__block-app-info-title">About Han-DIY</h2>
            <p className="about__block-app-info-para">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit culpa a, dolores vero perspiciatis eum, ipsam rem velit aut illo eaque, tenetur sint. Maiores architecto aliquid, laudantium minus dolorum labore!</p>
          </div>
        </div>
        <div className="about__block-dev">
          <h3 className="about__block-dev-title">Developer Contact</h3>
          <div className="about__block-dev-contact">
            <img className="about__block-dev-contact-logo" src={GitHubIcon} alt="GitHub Logo"/>
            <div className="about__block-dev-contact-detail">
              <h4 className="about__block-dev-contact-detail-service">Github:</h4>
              <a className="about__block-dev-contact-detail-link" href="https://github.com/jaspreetlall">github.com/jaspreetlall</a>
            </div>
          </div>
          <div className="about__block-dev-contact">
            <img className="about__block-dev-contact-logo" src={LinkedInIcon} alt="LinkedIn Logo"/>
            <div className="about__block-dev-contact-detail">
              <h4 className="about__block-dev-contact-detail-service">LinkedIn</h4>
              <a className="about__block-dev-contact-detail-link" href="https://www.linkedin.com/in/jaspreetlall">linkedin.com/in/jaspreetlall</a>
            </div>
          </div>
        </div>

      </div>
    </article>
  )
}

export default About
