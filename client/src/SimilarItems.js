import React, { useState, useEffect } from 'react';
import './SimilarItems.scss';

import ProductThumbnail from './ProductThumbnail';

const SimilarItems = (props) => {
    const [products, setProducts] = useState([]);

    let isMounted = true;

    const nameSplit = props.product.name.split(' ');
    const nameString = nameSplit.join(',');

    useEffect(() => {
        fetchProducts()

        return () => { isMounted = false; }
    }, [])

    const fetchProducts = () => {
        fetch('/server/product/similar/' + props.product.category._id + '/' + nameString, {
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
            if (res === undefined) {
                return [];
            }
            return res.text()
        }).then(function(text) {

            try {
                const data = JSON.parse(text)

                if (isMounted) {
                    setProducts(data);
                }
            } catch (err) {
                return
            }
            
        });
    }

    const productMap = products.map((product) => {
        if (product.itemID !== props.product.itemID) {
            return <ProductThumbnail
                itemID={product.itemID}
                name={product.name}
                category={product.category}
                sell={product.sell}
                buy={product.buy}
                exch={product.exch}
                key={'ProductThumbnail' + product.itemID}
            />
        } else {
            return null;
        }
    });

    if (products.length > 0) {
        return (
            <div className='SimilarItems'>
                <h2 className='SimilarItems__header'>You may also like...</h2>
                <div className='SimilarItems__products-container'>
                    {productMap}
                </div>
            </div>
        )
    } else {
        return null;
    };
}

export default SimilarItems;