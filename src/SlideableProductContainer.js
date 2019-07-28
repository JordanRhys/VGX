import React, { useState, useEffect } from 'react';
import './SlideableProductContainer.scss';

import ProductThumbnail from './ProductThumbnail';

const SlideableProductContainer = (props) => {
    const [products, setProducts] = useState([]);

    let isMounted = true;

    useEffect(() => {
        if (products.length < 1) {
            FetchProducts()
        }

        return () => { isMounted = false; }
    })

    const FetchProducts = () => {
        fetch(props.fetch, {
            headers: {
                Accept: 'application/json'
            },
        }).then(function(res) {
            if (res.status >= 200 && res.status <= 300) {
                return res;
            } else {
                console.log(res.status);
            }
        }).then(function(res) {
            return res.json()
        }).then(function(res) {
            if (isMounted) {
                setProducts(res);
            }
        });
    }

    const productMap = products.map((product) => {
        return(
            <ProductThumbnail
                itemID={product.itemID}
                name={product.name}
                category={product.category}
                sell={product.sell}
                buy={product.buy}
                exch={product.exch}
                key={product.itemID}
            />
        )
    })

    return(
        <section className='SlideableProductContainer Universal__box-shadow'>
            <h2 className='SlideableProductContainer__header'>{props.header}</h2>

            <div className='SlideableProductContainer__products-container'>
                {productMap}
            </div>
        </section>
    )
}


export default SlideableProductContainer;