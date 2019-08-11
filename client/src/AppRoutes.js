import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import './App.scss';

import HomePage from './HomePage';
import ProductDetail from './ProductDetail';
import SearchList from './SearchList';
import BasketDetail from './BasketDetail';
import ScrollToTop from './ScrollToTop';
import NotFound from './NotFound';
import About from './About';

const AppRoutes = ({location}) => {

    return (
        <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={200}
          classNames='fade'
        >
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
        </CSSTransition>
        </TransitionGroup>
    )
}

export default withRouter(AppRoutes);