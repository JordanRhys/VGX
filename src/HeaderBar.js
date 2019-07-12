import React, {useState, useEffect} from 'react';
import './HeaderBar.scss';

import Logo from './Logo';
import NavIcon from './NavIcon';
import SearchIcon from './SearchIcon';
// import UserIcon from './UserIcon';
import BasketIcon from './BasketIcon';
import NavBar from './NavBar';
import SearchBar from './SearchBar';

const HeaderBar = (props) => {
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  // const [redirect, setRedirect] = useState('');

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
    <div className='HeaderBar__container Universal__box-shadow'>
      <div className='HeaderBar__bar'>

        <div className='HeaderBar__left'>
          <NavIcon menuOpen={menuOpen} toggleMenu={toggleMenu}/>
          <SearchIcon searchOpen={searchOpen} toggleSearch={toggleSearch}/>
        </div>

        <Logo closeAll={closeAll}/>

        <div className='HeaderBar__right'>
          {/* <UserIcon/> */}
          <BasketIcon basketItems={props.basketItems}/>
        </div>
        
      </div>
      {(menuOpen) ? (
        <NavBar categories={categories} toggleOpen={toggleMenu}/>
      ) : null}
      {(searchOpen) ? (
        <SearchBar toggleSearch={toggleSearch}/>
      ) : null}
    </div>
  );
}

export default HeaderBar;