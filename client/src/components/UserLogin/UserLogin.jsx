import React, { useCallback, useContext } from "react";
import { Redirect } from "react-router";
import fire from "../../Firebase/Fire";
import { FireAuthContext } from "../../Firebase/AuthProvider";

const Login = (props) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await fire
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        props.history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [props.history]
  );

  const { currentUser } = useContext(FireAuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;