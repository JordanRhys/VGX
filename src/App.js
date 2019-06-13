import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import './Universal.scss';
import './Variables.scss';

import HeaderBar from './HeaderBar';
import HomePage from './HomePage';
import ProductDetail from './ProductDetail';

const App = () => {
  return (
    <div className='App__container'>
      <HeaderBar/>
      
      <Route
        exact
        path='/'
        component={HomePage}
      />

      <Route
        path='/product/:itemID'
        component={ProductDetail}
      />
    </div>
  );
}


export default App;
