import React, { useState, useEffect} from 'react';
import './CategoryDetail.scss';

import ProductListing from './ProductListing';

const CategoryDetail = (props) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchProducts()
    }, [props.match.params.name])

    const fetchProducts = () => {
        fetch(('/server/category/' + props.match.params.name), {
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
    const productList = products.map((product) => (
        <ProductListing product={product} key={product.itemID}/>
    ))

    return(
        <section className='CategoryDetail__container'>
            {productList}
        </section>
    )
}

export default CategoryDetail;