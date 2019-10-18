/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import '../../scss/main.scss';

import 'bootstrap/dist/css/bootstrap.css';

import RouterComponent from './Router';
import Footer from './components/Footer';

const App = () => (
  <div className="app">
    <RouterComponent />
    <Footer />
  </div>
);

export default App;
