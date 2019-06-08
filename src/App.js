import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';

import HeaderBar from './HeaderBar';
import HomePage from './HomePage';

const App = () => {
  return (
    <div className='App__container'>
      <HeaderBar/>
      
      <Route
        path='/home'
        component={HomePage}
      />
    </div>
  );
}


export default App;
