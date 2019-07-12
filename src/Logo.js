import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.scss';

const Logo = (props) => {
  return (
    <Link to="/" onClick={props.closeAll}>
      <div className='Logo__container'>
          <img
            className='Logo__img'
            src={process.env.PUBLIC_URL + '/VGX.png'}
            alt='VGX Logo'
          />
      </div>
    </Link>
  );
}

export default Logo;