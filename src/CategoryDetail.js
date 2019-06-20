import React, { useState, useEffect} from 'react';
import './CategoryDetail.scss';

import ProductListing from './ProductListing';
import LoadIcon from './LoadIcon';

const CategoryDetail = (props) => {
    const [products, setProducts] = useState([])
    const [_loading, _setLoading] = useState(true)

    useEffect(() => {
        _setLoading(true);
        fetchProducts();
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
            _setLoading(false)
        });
    }
    const productList = products.map((product) => (
        <ProductListing product={product} key={product.itemID}/>
    ))

    return(
        (_loading) ? 
        <LoadIcon/> : (
        <section className='CategoryDetail__container'>
            {productList}
        </section>
        )
    )
}

export default CategoryDetail;