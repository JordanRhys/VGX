import React from 'react';
import './ProductThumbnail.scss';

const ProductThumbnail = (props) => {
    return (
        <div className='ProductThumbnail__container'>
            <img 
                className='ProductThumbnail__image'
                src={process.env.PUBLIC_URL + '/products/'+ props.itemID + '.png'}
                alt={props.itemID + ' Image'}
            />
            <p className='ProductThumbnail__name'>{props.name}</p>
        </div>
    );
};

export default ProductThumbnail;