import React, { useState, useEffect } from 'react';

import './ProductDetail.scss';

const ProductDetail = (props) => {
    const [product, setProduct] = useState('');
    const [_loading, _setLoading] = useState(true);

    useEffect(() => {
        if (_loading) {
            loadProduct(props.match.params.itemID)
        }
    })

    const loadProduct = (itemID) => {
        fetch('/server/product/' + itemID, {
            headers: {
                Accept: 'application/json'
            }
        }).then(function(res) {
            if (res.status >= 200 && res.status <= 300) {
                return res;
            } else {
                console.log(res.status);
            }
        }).then(function(res) {
            return res.json()
        }).then(function(res) {
            setProduct(res)
            _setLoading(false)
        });
    }

    return(
        <main className='ProductDetail__container'>
            {(_loading) ? 
            <h1>Loading...</h1> : 
            
            <div className='ProductDetail__detail-container'>
                <img
                    className='ProductDetail__image'
                    src={process.env.PUBLIC_URL + '/products/' + product.itemID + '.png'}
                    alt={product.itemID + ' Image'}
                />
                <div className='ProductDetail__details'>
                    <h2 className='ProductDetail__name'>{product.name}</h2>
                    <p className='ProductDetail__category'>{product.category.name}</p>
                    <div className='ProductDetail__price-container'>
                        <p className='ProductDetail__text'>We Sell for: 
                        <span className='ProductDetail__price'> £{product.sell}</span></p>
                        {(product.buy) ? (
                            <p className='ProductDetail__text'>We Buy for:</p>
                        ) : (product.exch) ? (
                            <p className='ProductDetail__text'>We Buy for:</p>
                        ) : null}
                        {(product.buy) ? (
                            <p className='ProductDetail__text'>Cash: 
                            <span className='ProductDetail__price'> £{product.buy}</span></p>
                        ) : null}
                        {(product.exch) ? (
                            <p className='ProductDetail__text'>Exchange: 
                            <span className='ProductDetail__price'> £{product.exch}</span></p>
                        ) : null}
                    </div>
                    <div className='ProductDetail__stock-box'>
                        {(product.stock > 0) ?
                        <p className='ProductDetail__stock'>{product.stock} in Stock</p> :
                        <p className='ProductDetail__stock'>Out of stock</p>}
                    </div>
                </div>
            </div> }
        </main>
    )
}

export default ProductDetail;