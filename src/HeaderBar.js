import React from 'react';
import './HeaderBar.scss';

import Logo from './Logo';
import NavIcon from './NavIcon';

const HeaderBar = () => {
  return (
    <div className='HeaderBar__container Universal__box-shadow'>
      <NavIcon/>
      <Logo/>
    </div>
  );
}

export default HeaderBar;