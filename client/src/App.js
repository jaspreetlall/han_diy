import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Ideas from './components/Ideas/Ideas';
import IdeaCreate from './components/IdeaCreate/IdeaCreate';
import IdeaEdit from './components/IdeaEdit/IdeaEdit';
import IdeaDetails from './components/IdeaDetails/IdeaDetails';
import About from './components/About/About';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <div className="App">
      <Router>
        <>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/ideas" exact component={Ideas} />
            <Route path="/idea/create" exact component={IdeaCreate} />
            <Route path="/idea/:id/edit" exact component={IdeaEdit} />
            <Route path="/idea/:id/details" exact component={IdeaDetails} />
            <Route path="/about" exact component={About} />
            <Route path="/404" component={PageNotFound} />
            <Redirect to="/404" />
          </Switch>
          <Footer />
        </>
      </Router>
    </div>
  );
}

export default App;
