import React, { useCallback, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { FireAuthContext } from "../../Firebase/AuthProvider";
import fire from "../../Firebase/Fire";
import './UserLogin.scss';

const Login = (props) => {

  // Setting page title
  useEffect(() => {
  document.title = "Han-DIY | Log in";
  }, []);

  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
  });

  const [ disableLoginButton, setDisableLoginButton ] = useState(true);
  // State to hold login errors
  const [ errorMessage, setErrorMessage ] = useState('');
  
  // Submit handler to login using firebase
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      try {
      await fire
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password);
      props.history.push("/");
      } catch (error) {
      // Setting errors if any
      setErrorMessage(error.message);
      }
    }, [props.history, formData.email, formData.password]
  );
  
  // Getting current user from context
  const { currentUser } = useContext(FireAuthContext);
  
  // Redirecting to home page on successful login
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

  // Enable / Disable login button depending 
  // whether required fields have data
  const buttonStatus = () => {
    if (formData.email && formData.password && formData.password.length >= 8) {
      setDisableLoginButton(false);
    } else {
      setDisableLoginButton(true);
    }
  }

  return (
    <section className="login">
      <div className="login__block container">
        <h2 className="login__block-title">Log in</h2>
        <form className="login__block-form" onSubmit={handleLogin}>
          <div className="login__block-form-input">
            <label
              className="login__block-form-input-label"
              htmlFor="email">Email
            </label>
            <input
              className="login__block-form-input-field"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleChange}
              placeholder="Enter your email" />
          </div>
          <div className="login__block-form-input">
            <label
              className="login__block-form-input-label"
              htmlFor="password">Password
            </label>
            <input
              className="login__block-form-input-field"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleChange}
              placeholder="Enter your password" />
          </div>
          <div className="login__block-form-input login__block-form-input--buttons">
            <button
              className="login__block-form-input-button login__block-form-input-button--login"
              disabled={disableLoginButton}
              type="submit">Log in
            </button>
            <Link className="login__block-form-input-button" to="/">Cancel</Link>
          </div>
          {/* Displaying errors if any */}
          { errorMessage
          ? <p className="login__block-form-error">{errorMessage}</p>
          : <></>
          }
        </form>
      </div>
    </section>
  );
};

export default Login;