import React from 'react';
import './HomePage.scss';

import SlideableProductContainer from './SlideableProductContainer';

const HomePage = () => {
  return (
    <div className='HomePage__container'>
      
      <SlideableProductContainer
        header='Top Products'
      />

    </div>
  );
}

export default HomePage;