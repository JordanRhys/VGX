import React from 'react';
import './HeaderBar.scss';

import Logo from './Logo';

const HeaderBar = () => {
  return (
    <div className='HeaderBar__container Universal__box-shadow'>
      <div className='HeaderBar__nav-icon'></div>
      <Logo/>
    </div>
  );
}

export default HeaderBar;