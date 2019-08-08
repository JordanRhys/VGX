import React, {useState, useEffect} from 'react';
import Media from 'react-media';
import './HeaderBar.scss';

import {CSSTransition} from 'react-transition-group';

import Logo from './Logo';
import NavIcon from './NavIcon';
import SearchIcon from './SearchIcon';
import BasketIcon from './BasketIcon';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import SearchBarDesktop from './SearchBarDesktop';

const HeaderBar = (props) => {
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (categories.length === 0) {
        fetchCategories()
    }
  })

  const fetchCategories = () => {
    fetch('/server/categories', {
        headers: {
            Accept: 'application/json'
        }
    }).then(function(res) {
        if (res.status >= 200 && res.status <= 300) {
            return res;
        } else {
            console.log(res.status);
        }
    }).then(function(res) {
        return res.json()
    }).then(function(res) {
        setCategories(res)
    });
  }

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      closeAll();
      setMenuOpen(true);
    }
  }

  const toggleSearch = () => {
    if (searchOpen) {
      setSearchOpen(false);
    } else {
      closeAll()
      setSearchOpen(true);
    }
  }

  const closeAll = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  }

  return (
    <nav className='HeaderBar__container'>
      <div className='HeaderBar__bar'>

        <div className='HeaderBar__left'>
          <NavIcon menuOpen={menuOpen} toggleMenu={toggleMenu}/>
          <Media query="(min-width: 56.25em)">
            {matches => matches ? (
              <SearchBarDesktop toggleSearch={toggleSearch} menuOpen={menuOpen}/>
            ) : (
              <SearchIcon searchOpen={searchOpen} toggleSearch={toggleSearch}/>
            )}
          </Media>
        </div>

        <Logo closeAll={closeAll}/>

        <div className='HeaderBar__right'>
          <BasketIcon basketItems={props.basketItems}/>
        </div>
        
      </div>
      {/* {(menuOpen) ? (
          <NavBar categories={categories} toggleOpen={toggleMenu}/>
      ) : null} */}
      <CSSTransition
        in={menuOpen}
        timeout={400}
        classNames='nav-transition'
        unmountOnExit
      >
        <NavBar categories={categories} toggleOpen={toggleMenu}/>
      </CSSTransition>
      {(searchOpen) ? (
        <SearchBar toggleSearch={toggleSearch}/>
      ) : null}
    </nav>
  );
}

export default HeaderBar;