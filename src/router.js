import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Donate from './components/Donate/Donate';
import Navigation from './components/Navigation';

const RouterComponent = () => (
  <Router>
    <Navigation />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/donate" component={Donate} />
    </Switch>
  </Router>
);

export default RouterComponent;
