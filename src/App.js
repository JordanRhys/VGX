import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import './Universal.scss';
import './Variables.scss';

import HeaderBar from './HeaderBar';
import HomePage from './HomePage';

const App = () => {
  return (
    <div className='App__container'>
      <HeaderBar/>
      
      <Route
        path='/'
        component={HomePage}
      />
    </div>
  );
}


export default App;
