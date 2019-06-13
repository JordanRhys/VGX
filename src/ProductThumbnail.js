import React from 'react';
import { Link } from 'react-router-dom'
import './ProductThumbnail.scss';

const ProductThumbnail = (props) => {
    return (
        <Link to={'/product/' + props.itemID}>
            <div className='ProductThumbnail__container'>
                <img 
                    className='ProductThumbnail__image'
                    src={process.env.PUBLIC_URL + '/products/'+ props.itemID + '.png'}
                    alt={props.itemID + ' Image'}
                />
                <p className='ProductThumbnail__name'>{props.name}</p>
                <div className='ProductThumbnail__price-container'>
                    <p className='ProductThumbnail__sell'>We Sell: £{props.sell}</p>
                    <div className='ProductThumbnail__trade-container'>
                        {(props.buy === undefined && props.exch === undefined) ? null : (
                            <p className='ProductThumbnail__trade'>Trade in for:</p>)}
                        {(props.buy !== undefined) ? (
                            <p className='ProductThumbnail__trade'>Cash: £{props.buy}</p>) : null}
                        {(props.exch !== undefined) ? (
                            <p className='ProductThumbnail__trade'>Exchange: £{props.exch}</p>) : null}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductThumbnail;