import React from 'react';
import {Link} from 'react-router-dom';
import './ProductListing.scss';

import { toCurrency } from './helpers';

const ProductListing = (props) => {
    return(
        <div className='ProductListing__container'>
            <div className='ProductListing__image-container'>
                <Link to={'/product/' + props.product.itemID}>
                    <img 
                        className='ProductListing__image'
                        src={process.env.PUBLIC_URL + '/products/'+ props.product.itemID + '-thumb.jpg'}
                        alt={props.product.name + ' Image'}
                    />
                </Link>
            </div>
            <div className='ProductListing__detail-container'>
                <Link to={'/product/' + props.product.itemID}>
                    <h2 className='ProductListing__header'>
                        {props.product.name}
                    </h2>
                    <p className='ProductListing__category'>
                            {props.product.category.name}
                    </p>
                    <div className='ProductListing__price-container'>
                        <p className='ProductListing__text'>
                            We Sell for:
                        </p>
                        <p className='ProductListing__price'>
                            &nbsp;{toCurrency(props.product.sell)}
                        </p>
                    </div>
                    <div className='ProductListing__price-container'>
                        <p className='ProductListing__text'>
                            Trade in for Cash:
                        </p>
                        <p className='ProductListing__price'>
                            &nbsp;{toCurrency(props.product.buy)}
                        </p>
                    </div>
                    <div className='ProductListing__price-container'>
                        <p className='ProductListing__text'>
                            Trade in for Exchange:
                        </p>
                        <p className='ProductListing__price'>
                            &nbsp;{toCurrency(props.product.exch)}
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default ProductListing;