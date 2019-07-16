import React from 'react';
import { Link } from 'react-router-dom'
import './ProductThumbnail.scss';

import { toCurrency } from './helpers';

const ProductThumbnail = (props) => {
    return (
        <Link to={'/product/' + props.itemID}>
            <div className='ProductThumbnail__container'>
                <img 
                    className='ProductThumbnail__image'
                    src={process.env.PUBLIC_URL + '/products/'+ props.itemID + '.png'}
                    alt={props.name + ' Image'}
                />
                <p className='ProductThumbnail__name'>{props.name}</p>
                <div className='ProductThumbnail__price-container'>
                    <p className='ProductThumbnail__sell'>We Sell: £{toCurrency(props.sell)}</p>
                    <div className='ProductThumbnail__trade-container'>
                        <p className='ProductThumbnail__trade'>Trade in for:</p>
                        <p className='ProductThumbnail__trade'>Cash: £{toCurrency(props.buy)}</p>
                        <p className='ProductThumbnail__trade'>Exchange: £{toCurrency(props.exch)}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductThumbnail;