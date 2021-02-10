import React, { useState, useEffect } from 'react';
import fire from './Fire';

export const FireAuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    });
  }, []);

  if(pending){
    return <>Loading...</>
  }

  return (
    <FireAuthContext.Provider
      value={{
        currentUser
      }}
    >
      {props.children}
    </FireAuthContext.Provider>
  );
};