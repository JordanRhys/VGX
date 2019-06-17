import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import './Universal.scss';
import './Variables.scss';

import HeaderBar from './HeaderBar';
import HomePage from './HomePage';
import ProductDetail from './ProductDetail';
import CategoryDetail from './CategoryDetail';

const App = () => {
  return (
    <div className='App__container'>
      <HeaderBar/>
      <div className="App__top-padding"/>
      <Route
        exact
        path='/'
        component={HomePage}
      />

      <Route
        path='/product/:itemID'
        component={ProductDetail}
      />

      <Route
        path='/category/:name'
        component={CategoryDetail}
      />
    </div>
  );
}


export default App;
