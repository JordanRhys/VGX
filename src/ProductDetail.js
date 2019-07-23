import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './ProductDetail.scss';
import LoadIcon from './LoadIcon';
import AddToBasket from './AddToBasket';
import SimilarItems from './SimilarItems';

import { toCurrency } from './helpers';

const ProductDetail = (props) => {
    const [product, setProduct] = useState('');
    const [_loading, _setLoading] = useState(true);

    useEffect(() => {
        loadProduct(props.match.params.itemID)
    }, [props.match.params.itemID])

    useEffect(() => {
        if (product) {
            document.title = product.name + ' - VGX';
        }
        return () => {
            document.title = 'VGX - Video Game eXchange';
        }
    }, [product]);

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
        <main className='ProductDetail__container Universal__box-shadow'>
            {(_loading) ? 
            <LoadIcon/> :
            
            <div className='ProductDetail__detail-container'>
                <img
                    className='ProductDetail__image'
                    src={process.env.PUBLIC_URL + '/products/' + product.itemID + '.png'}
                    alt={product.name + ' Image'}
                />
                <div className='ProductDetail__details'>
                    <h2 className='ProductDetail__name'>{product.name}</h2>
                    <Link to={'/category/' + product.category.spaceless_name}>
                        <p className='ProductDetail__category'>{product.category.name}</p>
                    </Link>
                    <div className='ProductDetail__price-container'>
                        <p className='ProductDetail__text'>We Sell for: 
                        <span className='ProductDetail__price'> {toCurrency(product.sell)}</span></p>
                        {(product.buy) ? (
                            <p className='ProductDetail__text'>Trade in for Cash: 
                            <span className='ProductDetail__price'> {toCurrency(product.buy)}</span></p>
                        ) : null}
                        {(product.exch) ? (
                            <p className='ProductDetail__text'>Trade in for Exchange: 
                            <span className='ProductDetail__price'> {toCurrency(product.exch)}</span></p>
                        ) : null}
                    </div>

                    <div className='ProductDetail__stock-box'>
                        {(product.stock === 0) ? (
                            null
                        ) : (
                            <AddToBasket itemID={product.itemID} />
                        )}
                        {(product.stock === 0) ? (
                            <p className='ProductDetail__stock ProductDetail__stock--zero'>Out of stock</p>
                        ) : (product.stock > 9) ? (
                            <p className='ProductDetail__stock'>10+ Available</p>
                        ) : (
                            <p className='ProductDetail__stock'>{product.stock} in Stock</p>
                        )}
                    </div>


                </div>
            </div> }

            {(_loading) ? (
                null
            ) : (
                <SimilarItems
                    product={product}
                />
            )}
        </main>
    )
}

export default ProductDetail;