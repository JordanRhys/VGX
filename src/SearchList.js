import React, {useState, useEffect} from 'react';
import './SearchList.scss';

import ProductListing from './ProductListing';
import LoadIcon from './LoadIcon';
import SearchFilter from './SearchFilter';

const SearchList = (props) => {
    const [products, setProducts] = useState([]);
    const [_loading, _setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetchProducts()
    }, [props.match.params.search])

    // Grab used Categories from products
    useEffect(() => {
        getCategories()
            .then(cats => setCategories(cats))
            .catch(error => { console.log(error)})
    }, [products])

    const fetchProducts = () => {
        console.log(props.path + props.match.params.search)
        fetch((props.path + props.match.params.search), {
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
            resetFilters()
            _setLoading(false)
        });
    }

    const getCategories = () => {
        return new Promise((resolve, reject) => {
            const cats = [];
            products.map((product) => {
                if (cats.indexOf(product.category.name) === -1) {
                    cats.push(product.category.name);
                }
            });
            cats.sort();
            resolve(cats);
        })
    }

    const setCategories = (cats) => {
        setCategoryList(cats)
    }

    const applyFilters = (obj) => {
        filterCategories(obj)
            .then((obj) => (
                filterStocked(obj)
            ))
            .then((obj) => (
                filterPrice(obj)
            ))
            .then((products) => {
                console.log(products);
                if (products.length > 0) {
                    setFilteredProducts(products);
                } else {
                    setFilteredProducts([]);
                }
            })
            .catch((error) => console.log(error));
    }

    const filterCategories = (obj) => {
        return new Promise((resolve, reject) => {
            if (obj.categories.length > 0) {
                const filtered = products.filter((product) => (
                    obj.categories.indexOf(product.category.name) !== -1
                )) || [];
                resolve({
                    products: filtered,
                    min: obj.min,
                    max: obj.max,
                    stocked: obj.stocked
                });
            } else {
                resolve({
                    products: products,
                    min: obj.min,
                    max: obj.max,
                    stocked: obj.stocked
                });
            }
        })
    }

    const filterStocked = (obj) => {
        console.log(obj);
        const filtered = obj.products.filter((product) => (
            product.stock > 0
        )) || [];
        console.log(filtered);
        const object = {
            products: filtered,
            min: obj.min,
            max: obj.max
        };
        return object;
    }

    const filterPrice = (obj) => {
        const filtered = obj.products.filter((product) => (
            product.sell >= obj.min && product.sell <= obj.max
        )) || [];
        return filtered;
    }

    const resetFilters = () => {
        setFilteredProducts([]);
    }

    const productList = products.map((product) => (
        <ProductListing product={product} key={product.itemID}/>
    ))

    const filteredProductList = filteredProducts.map((product) => (
        <ProductListing product={product} key={product.itemID}/>
    ))


    if (filteredProducts.length === 0) {
        return(
            (_loading) ? (
                    <LoadIcon/>
                ) : (
                <section className='SearchDetail__container'>
                    <SearchFilter
                        products={products}
                        categoryList={categoryList}
                        applyFilters={(obj) => (applyFilters(obj))}
                        resetFilters={resetFilters}
                    />
                    {productList}
                </section>
            )
        )
    } else {
        return(
            (_loading) ? (
                    <LoadIcon/>
                ) : (
                <section className='SearchDetail__container'>
                    <SearchFilter
                        products={products}
                        categoryList={categoryList}
                        applyFilters={(obj) => (applyFilters(obj))}
                        resetFilters={resetFilters}
                    />
                    {filteredProductList}
                </section>
            )
        )
    }
}

export default SearchList;