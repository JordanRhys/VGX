import React, {useState, useEffect} from 'react';
import './SearchDetail.scss';

import ProductListing from './ProductListing';
import LoadIcon from './LoadIcon';

const SearchDetail = (props) => {
    const [products, setProducts] = useState([])
    const [_loading, _setLoading] = useState(true)

    useEffect(() => {
        fetchProducts()
    }, [props.match.params.search])

    const fetchProducts = () => {
        console.log('/server/search/' + props.match.params.search)
        fetch(('/server/search/' + props.match.params.search), {
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
        <section className='SearchDetail__container'>
            {productList}
        </section>
        )
    )
}

export default SearchDetail;