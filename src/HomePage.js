import React from 'react';
import './HomePage.scss';

import SlideableProductContainer from './SlideableProductContainer';

const HomePage = () => {
  return (
    <div className='HomePage__container'>
      
      <SlideableProductContainer
        header='Top Products'
        fetch='/server/topproducts'
      />

    </div>
  );
}

export default HomePage;