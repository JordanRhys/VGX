import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import './Universal.scss';
import './Variables.scss';

import HeaderBar from './HeaderBar';
import HomePage from './HomePage';
import ProductDetail from './ProductDetail';
import SearchList from './SearchList';

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
        path='/category/:search'
        render={(props) => (<SearchList {...props} path='/server/category/' />)}
      />

      <Route
        path='/search/:search'
        render={(props) => (<SearchList {...props} path='/server/search/' />)}
      />
    </div>
  );
}


export default App;
