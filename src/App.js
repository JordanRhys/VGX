import React, { useState, useEffect, createContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import './Universal.scss';
import './Variables.scss';

import HeaderBar from './HeaderBar';
import HomePage from './HomePage';
import ProductDetail from './ProductDetail';
import SearchList from './SearchList';
import BasketDetail from './BasketDetail';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import NotFound from './NotFound';
import About from './About';

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

  return (
    <BasketContext.Provider value={updateBasketItems}>
      <div className='App__container'>
        <HeaderBar basketItems={basketItems}/>
        <span className="App__top-padding"/>
        <Switch>
        <Route
          exact
          path='/'
          component={HomePage}
        />

        <Route
          path='/about'
          component={About}
        />

        <Route
          path='/product/:itemID'
          render={(props) => (<ScrollToTop>
              <ProductDetail {...props}/>
            </ScrollToTop>)}
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

        <Route
          path='*'
          component={NotFound}
        />
        </Switch>
      </div>
      <Footer/>
    </BasketContext.Provider>
  );
}


export default App;
export {BasketContext};