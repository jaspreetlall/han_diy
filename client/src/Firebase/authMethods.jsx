import firebase from 'firebase/app';

// This is a collection of methods stored in an object
export const authMethods = {
  // Signup method
  signup: (email, password, setErrors, setToken) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( async res => {
        const token = await Object.entries(res.user)[5][1].b;
        await localStorage.setItem('token', token);
        setToken(window.localStorage.token)
      })
      .catch(err => {
        //saving error messages
        setErrors(prev => ([...prev, err.message]))
      })
  },

  // Signin method
  signin: (email, password, setErrors, setToken) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then( async res => {
        const token = await Object.entries(res.user)[5][1].b;
        await localStorage.setItem('token', token);
        setToken(window.localStorage.token)
      }) 
      .catch(err => {
        //saving error messages
        setErrors(prev => ([...prev, err.message]))
      })
  },

  // Signout method
  signout: (setErrors, setToken) => {
    firebase.auth().signOut()
      .then(res => {
        localStorage.removeItem('token');
        setToken(window.localStorage.token)
      })
      .catch(err => {
        //saving error messages
        setErrors(prev => ([...prev, err.message]))
        localStorage.removeItem('token');
        setToken(window.localStorage.token);
      })
  },
}