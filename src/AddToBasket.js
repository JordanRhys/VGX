import React, { useState, useEffect, useContext } from 'react';
import './AddToBasket.scss';

import { BasketContext } from './App';

const AddToBasket = (props) => {
    const api = useContext(BasketContext);

    const [inBasket, setInBasket] = useState(false);


    useEffect(() => {
        if (localStorage.getItem('basket')) {
            let basket = JSON.parse(localStorage.getItem('basket'));
            if (basket.indexOf(props.itemID) > -1) {
                setInBasket(true);
            } else {
                setInBasket(false);
            }
        } else {
            setInBasket(false);
        }
    }, [inBasket]);

    const addToBasket = (itemID) => {

        let basket = [];
        if (localStorage.getItem('basket')) {
            basket = JSON.parse(localStorage.getItem('basket'));
            basket.push(itemID);
            console.log(basket);
            localStorage.setItem('basket', JSON.stringify(basket));


        } else {
            basket[0] = itemID;
            localStorage.setItem('basket', JSON.stringify(basket));
        }

        console.log(localStorage.getItem('basket'));
        setInBasket(true);
        updateBasketIndicator();
    }

    const removeFromBasket = (itemID) => {

        let basket = JSON.parse(localStorage.getItem('basket'));
        let newBasket = basket.filter((product) => (
            product !== itemID
        ));
        console.log(newBasket);
        localStorage.setItem('basket', JSON.stringify(newBasket));
        setInBasket(false);
        updateBasketIndicator();
    }

    const updateBasketIndicator = () => {
        api();
    }

    return(
        (inBasket) ? (
            <button
                className='AddToBasket__button AddToBasket__button--disabled'
                onClick={() => ( removeFromBasket(props.itemID))}
            >
                Remove from Basket
            </button>
        ) : (
            <button
                className='AddToBasket__button AddToBasket__button--active'
                onClick={() => ( addToBasket(props.itemID))}
            >
                Add to Basket
            </button>
        )
    )
}

export default AddToBasket;