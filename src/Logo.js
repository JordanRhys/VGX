import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.scss';

const Logo = (props) => {
  return (
    <Link to="/" onClick={props.closeAll}>
      <div className='Logo__container'>
          <h1 className='Logo__header'>VGX</h1>
      </div>
    </Link>
  );
}

export default Logo;