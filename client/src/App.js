import './App.css';
import Header from './components/Header/Header';
import React from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Ideas from './components/Ideas/Ideas';
import IdeaCreate from './components/IdeaCreate/IdeaCreate';
import IdeaEdit from './components/IdeaEdit/IdeaEdit';
import IdeaDetails from './components/IdeaDetails/IdeaDetails';
import About from './components/About/About';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Nav from './components/Nav/Nav';
import { AuthProvider } from './Firebase/AuthProvider';
import PrivateRoute from './Firebase/PrivateRoute';
import UserSignup from './components/UserSignup/UserSignup';
import UserLogin from './components/UserLogin/UserLogin';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <>
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <PrivateRoute path="/ideas" exact component={Ideas} />
              <PrivateRoute path="/idea/create" exact component={IdeaCreate} />
              <PrivateRoute path="/idea/:id/edit" exact component={IdeaEdit} />
              <PrivateRoute path="/idea/:id/details" exact component={IdeaDetails} />
              <Route path="/about" exact component={About} />
              <Route path="/signup" exact component={UserSignup} />
              <Route path="/login" exact component={UserLogin} />
              <Route path="/404" component={PageNotFound} />
              <Redirect to="/404" />
            </Switch>
            <Nav />
          </>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
