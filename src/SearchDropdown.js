import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SearchDropdown.scss';

import { toCurrency } from './helpers';

const SearchDropdown = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, [props.search]);

    const fetchProducts = () => {
        fetch(('/server/search/dropdown/' + props.search), {
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
        });
    }

    const productsMap = products.map((product) => (
        <Link to={'/product/' + product.itemID} onClick={props.toggleSearch} key={'dropdown' + product.itemID}>
            <li
                className='SearchDropdown__list-item'
            >
                <p className='SearchDropdown__item-name'>{product.name} <span className='SearchDropdown__cat'>/ {product.category.name}</span></p>
                <div className='SearchDropdown__prices'>
                    <p className='SearchDropdown__text'>We Sell for: <span>{toCurrency(product.sell)}</span></p>
                    <p className='SearchDropdown__text'>Trade in for Cash: <span>{toCurrency(product.buy)}</span></p>
                    <p className='SearchDropdown__text'>Trade in for Exchange: <span>{toCurrency(product.exch)}</span></p>
                </div>
            </li>
        </Link>
    ));

    if (products.length > 0) {
        return (
            <ul className='SearchDropdown__list'>
                {productsMap}
            </ul>
        )
    } else {
        return null;
    }
}

export default SearchDropdown;