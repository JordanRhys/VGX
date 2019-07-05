import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BasketDetail.scss';

import LoadIcon from './LoadIcon';

const BasketDetail = () => {
    const [_loading, _setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        pullLocal()
            .then((basket) => { fetchProducts(basket)})
            .catch((error) => { console.log(error) });
    }, []);

    const pullLocal = () => {
        return new Promise((resolve, reject) => {
            let basket = JSON.parse(localStorage.getItem('basket'));
            basket.join(',');
            console.log(basket);
            resolve(basket);
        })
    }

    const fetchProducts = (basket) => {
        console.log('/server/basket/' + basket)
        fetch(('/server/basket/' + basket), {
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
            console.log(res)
            return res.json()
        }).then(function(res) {
            setProducts(res)
            _setLoading(false)
        });
    }

    const productList = products.map((product) => (
        <li className='BasketDetail__list-item' key={product.itemID}>
            <Link to={'/product/' + product.itemID}>
                <img
                    className='BasketDetail__image'
                    src={process.env.PUBLIC_URL + '/products/' + product.itemID + '.png'}
                    alt={product.name + ' Image'}
                />
            </Link>
            <div className='BasketDetail__details'>
                <Link to={'/product/' + product.itemID}>
                    <div>
                        <p className='BasketDetail__name'>{product.name}</p>
                        <p className='BasketDetail__cat'>{product.category.name}</p>
                    </div>
                </Link>
                <div>
                    <p className='BasketDetail__price'>Price: <span className='BasketDetail__price-span'>£{product.sell}</span></p>
                    <p className='BasketDetail__remove'>Remove</p>
                </div>
            </div>
        </li>
    ));

    const price = products.reduce((prev, cur) => prev + cur.sell, 0);
    const delivery = (price >= 50) ? 0 : 1.50;
    const total = price + delivery;

    return (
        <section className='BasketDetail__container'>
            <ul className='BasketDetail__list'>
                {productList}
            </ul>

            <div className='BasketDetail__total-container'>
                <div className='BasketDetail__row'>
                    <p className='BasketDetail__text'>Price:</p>
                    <p className='BasketDetail__value'>£{price}</p>
                </div>
                <div className='BasketDetail__row'>
                    <p className='BasketDetail__text'>Delivery:</p>
                    <p className='BasketDetail__value'>
                        {(delivery === 0) ? 'Free' : '£' + delivery}
                    </p>
                </div>
                <div className='BasketDetail__row'>
                    <p className='BasketDetail__text'>Grand Total:</p>
                    <p className='BasketDetail__value'>£{total}</p>
                    <button className='BasketDetail__checkout'>Checkout</button>
                </div>
            </div>
        </section>
    )
}

export default BasketDetail;