import React, { useState, useEffect, createContext } from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import './Universal.scss';
import './Variables.scss';

import HeaderBar from './HeaderBar';
import HomePage from './HomePage';
import ProductDetail from './ProductDetail';
import SearchList from './SearchList';
import BasketDetail from './BasketDetail';

const BasketContext = createContext();

const App = () => {
  const [basketItems, setBasketItems] = useState(0);

  useEffect(() => {
    updateBasketItems();
  });
  
  const updateBasketItems = () => {
    if (localStorage.getItem('basket')) {
      let basket = JSON.parse(localStorage.getItem('basket'));
      if (basket.length) {
        setBasketItems(basket.length);
      } else {
        setBasketItems(0);
      }
    } 
  }

  const api = { updateBasketItems };

  return (
    <BasketContext.Provider value={updateBasketItems}>
      <div className='App__container'>
        <HeaderBar basketItems={basketItems}/>
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

        <Route
          path='/basket'
          component={BasketDetail}
        />
      </div>
    </BasketContext.Provider>
  );
}


export default App;
export {BasketContext};