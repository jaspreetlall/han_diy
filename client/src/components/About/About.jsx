import React, { useEffect } from 'react';
import './About.scss';
import AppIcon from '../../assets/icons/about-app.png';
import GitHubIcon from '../../assets/icons/GitHub-Mark-120px-plus.png';
import LinkedInIcon from '../../assets/icons/LI-In-Bug.png';

function About() {

  useEffect(() => {
    document.title = "Han-DIY | About";
  }, []);

  return (
    <article className="about">
      <div className="about__block container">
        <div className="about__block-app">
          <div className="about__block-app-logo">
            <img className="about__block-app-logo-img" src={AppIcon} alt="Han-DIY logo"/>
          </div>
          <div className="about__block-app-info">
            <h2 className="about__block-app-info-title">Han-DIY</h2>
            <p className="about__block-app-info-para">
              Han-DIY is aimed to help you store all your DIY ideas with ease and keep them handy.
            </p>
            <p className="about__block-app-info-para">
              Along with the title, description and category, you also have an option to add a list of parts and tools required. Additional notes or reference link can be added as well. The ideas can be viewed at a tap of a button.
            </p>
            <p className="about__block-app-info-para">
              Once you bring an idea to reality, the idea can be marked as 'Completed'. 
            </p>
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
