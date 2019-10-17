/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import '../scss/main.scss';

import RouterComponent from './router';
import Footer from './components/Footer';

const App = () => (
  <div className="app">
    <RouterComponent />
    <Footer />
  </div>
);

export default App;
