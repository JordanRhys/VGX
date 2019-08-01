import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BasketContext } from './App';
import './BasketDetail.scss';

import { toCurrency } from './helpers';

import LoadIcon from './LoadIcon';
import ProcessOrder from './ProcessOrder';

const BasketDetail = () => {
    const api = useContext(BasketContext);
    let isMounted = true;

    const [_loading, _setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        pullLocal()
            .then((basket) => { fetchProducts(basket)})
            .catch((error) => { console.log(error) });

        return () => { isMounted = false; }
    }, []);

    const pullLocal = () => {
        return new Promise((resolve, reject) => {
            let basket = JSON.parse(localStorage.getItem('basket'));
            basket.join(',');
            resolve(basket);
        })
    }

    const fetchProducts = (basket) => {
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
            if (res !== undefined) {
                return res.json();
            }
        }).then(function(res) {
            if (isMounted) {
                if (res !== undefined) {
                    setProducts(res)
                }
                _setLoading(false);
            }
        });
    }

    const removeItem = (itemID) => {
        let basket = JSON.parse(localStorage.getItem('basket'));
        let newBasket = basket.filter((product) => (
            product !== itemID
        ));
        localStorage.setItem('basket', JSON.stringify(newBasket));

        let filtered = products.filter((product) => (
            product.itemID !== itemID
        ))

        setProducts(filtered);

        api();
    }

    const processOrder = () => {
        setProcessing(true);
    }

    const productList = products.map((product) => (
        <li className='BasketDetail__list-item' key={product.itemID}>
            <Link to={'/product/' + product.itemID}>
                <img
                    className='BasketDetail__image'
                    srcSet={`
                        ${process.env.PUBLIC_URL}/products/${product.itemID}-thumb.jpg 1x,
                        ${process.env.PUBLIC_URL}/products/${product.itemID}-thumb-2x.jpg 2x
                    `}
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
                    <p className='BasketDetail__price'>Price: <span className='BasketDetail__price-span'>{toCurrency(product.sell)}</span></p>
                    <p
                        className='BasketDetail__remove'
                        onClick={() => removeItem(product.itemID)}
                    >
                        Remove
                    </p>
                </div>
            </div>
        </li>
    ));

    const price = products.reduce((prev, cur) => prev + cur.sell, 0);
    const priceString = toCurrency(price);

    const delivery = (price >= 50) ? 0 : 2.50;
    const deliveryString = toCurrency(delivery);

    const total = price + delivery;
    const totalString = toCurrency(total);


    if (_loading) {
        return (
            <LoadIcon/>
        );
    
    } else if (processing) {
        return <ProcessOrder/>

    } else if (products.length === 0) {
        return (
            <section className='BasketDetail'>
                <svg className='BasketDetail__svg' viewBox="0 0 32 28">
                    <path d="M10 24c0 1.094-0.906 2-2 2s-2-0.906-2-2 0.906-2 2-2 2 0.906 2 2zM24 24c0 1.094-0.906 2-2 2s-2-0.906-2-2 0.906-2 2-2 2 0.906 2 2zM26 7v8c0 0.5-0.391 0.938-0.891 1l-16.312 1.906c0.078 0.359 0.203 0.719 0.203 1.094 0 0.359-0.219 0.688-0.375 1h14.375c0.547 0 1 0.453 1 1s-0.453 1-1 1h-16c-0.547 0-1-0.453-1-1 0-0.484 0.703-1.656 0.953-2.141l-2.766-12.859h-3.187c-0.547 0-1-0.453-1-1s0.453-1 1-1h4c1.047 0 1.078 1.25 1.234 2h18.766c0.547 0 1 0.453 1 1z"></path>
                </svg>
                <p className='BasketDetail__text'>Your basket is empty</p>
            </section>
        );

    } else {
        return (
            <section className='BasketDetail'>
                <ul className='BasketDetail__list'>
                    {productList}
                </ul>
    
                <div className='BasketDetail__container'>
                    <div className='BasketDetail__row'>
                        <p className='BasketDetail__text'>Price:</p>
                        <p className='BasketDetail__value'>{priceString}</p>
                    </div>
                    <div className='BasketDetail__row'>
                        <p className='BasketDetail__text'>Delivery:</p>
                        <p className='BasketDetail__value'>
                            {(delivery === 0) ? 'Free' : deliveryString}
                        </p>
                    </div>
                    <div className='BasketDetail__row'>
                        <p className='BasketDetail__text'>Grand Total:</p>
                        <p className='BasketDetail__value'>{totalString}</p>
                        <button
                            className='BasketDetail__checkout'
                            onClick={processOrder}
                        >Checkout</button>
                    </div>
                </div>
            </section>
        );
    }
}

export default BasketDetail;