import React, { useCallback, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { FireAuthContext } from "../../Firebase/AuthProvider";
import fire from "../../Firebase/Fire";
import './UserSignup.scss'

const SignUp = (props) => {

  // Setting page title
  useEffect(() => {
  document.title = "Han-DIY | Sign up";
  }, []);

  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [ disableSignupButton, setDisableSignupButton ] = useState(true);
  // State to hold login errors
  const [ errorMessage, setErrorMessage ] = useState('');

  // Submit handler to signup using firebase
  const handleSignup = useCallback(
    async (event) => {
      event.preventDefault();
      try {
      await fire
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password);
      props.history.push("/");
    } catch (error) {
      // Setting errors if any
      setErrorMessage(error.message);
    }
  }, [props.history, formData.email, formData.password]);

  // Getting current user from context
  const { currentUser } = useContext(FireAuthContext);
  
  // Redirecting to home page on successful signup
  if (currentUser) {
    return <Redirect to="/" />;
  }

  // Function to handle form input changes
  // and set values in state
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}))
    buttonStatus();
    setErrorMessage('');
  }

  // Enable / Disable signup button depending 
  // whether required fields have data
  const buttonStatus = () => {
    if (
      formData.email
      && formData.password
      && formData.confirmPassword
      && formData.password === formData.confirmPassword
      && formData.password.length >= 8
    ) {
      setDisableSignupButton(false);
    } else {
      setDisableSignupButton(true);
    }
  }

  return (
    <section className="signup">
      <div className="signup__block container">
        <h2 className="signup__block-title">Sign up</h2>
        <form className="signup__block-form" onSubmit={handleSignup}>
          <div className="signup__block-form-input">
            <label
              className="signup__block-form-input-label"
              htmlFor="email">Email
            </label>
            <input
              className="signup__block-form-input-field"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleChange}
              placeholder="Enter your email" />
          </div>
          <div className="signup__block-form-input">
            <label
              className="signup__block-form-input-label"
              htmlFor="password">Password
            </label>
            <input
              className="signup__block-form-input-field"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleChange}
              placeholder="Enter your password. Minimum 8 characters" />
          </div>
          <div className="signup__block-form-input">
            <label
              className="signup__block-form-input-label"
              htmlFor="confirmPassword">Confirm password
            </label>
            <input
              className="signup__block-form-input-field"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleChange}
              placeholder="Type your password again" />
          </div>
          <div className="signup__block-form-input signup__block-form-input--buttons">
            <button
              className="signup__block-form-input-button signup__block-form-input-button--login"
              disabled={disableSignupButton}
              type="submit">Sign up
            </button>
            <Link className="signup__block-form-input-button" to="/">Cancel</Link>
          </div>
          {/* Displaying errors if any */}
          { errorMessage
          ? <p className="signup__block-form-error">{errorMessage}</p>
          : <></>
          }
        </form>
      </div>
    </section>
  );
};

export default SignUp;