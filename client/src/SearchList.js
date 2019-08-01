import React, {useState, useEffect} from 'react';
import Media from 'react-media';
import './SearchList.scss';

import ProductListing from './ProductListing';
import LoadIcon from './LoadIcon';
import SearchFilter from './SearchFilter';
import SearchFilterDesktop from './SearchFilterDesktop';

const SearchList = (props) => {
    const [products, setProducts] = useState([]);
    const [_loading, _setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filtered, setFiltered] = useState(false);
    const [sortBy, setSortBy] = useState();

    let isMounted = true;

    useEffect(() => {
        fetchProducts();

        return () => { isMounted = false; }
    }, [props.match.params.search])

    // Grab used Categories from products
    useEffect(() => {
        getCategories()
            .then(cats => setCategories(cats))
            .catch(error => { console.log(error)})
    }, [products])

    const fetchProducts = () => {
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
            return res.json()
        }).then(function(res) {
            if (isMounted) {
                setProducts(res)
                resetFilters()
                _setLoading(false)
            }
        });
    }

    const getCategories = () => {
        return new Promise((resolve, reject) => {
            const cats = [];
            products.map((product) => {
                if (cats.indexOf(product.category.name) === -1) {
                    cats.push(product.category.name);
                }
                return null;
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
                if (products.length > 0) {
                    setFilteredProducts(products);
                } else {
                    setFilteredProducts([]);
                }
                if (isMounted) {
                    setFiltered(true);
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
        if (obj.stocked) {
            const filtered = obj.products.filter((product) => (
                product.stock > 0
            )) || [];
            
            const object = {
                products: filtered,
                min: obj.min,
                max: obj.max
            };
            return object;
        } else {
            const object = {
                products: obj.products,
                min: obj.min,
                max: obj.max
            };
            return object;
        }
    }

    const filterPrice = (obj) => {
        const filtered = obj.products.filter((product) => (
            product.sell >= obj.min && product.sell <= obj.max
        )) || [];
        return filtered;
    }

    const resetFilters = () => {
        if (isMounted) {
            setFiltered(false);
            setFilteredProducts([]);
        }
    }

    const sortItems = (sort) => {
        setSortBy(sort);
        return new Promise((resolve, reject) => {
            var items;
            var filtered;
            if (filteredProducts.length > 0) {
                items = filteredProducts;
                filtered = true;
            } else {
                items = products;
                filtered = false;
            }
            if (sort === 'nameAsc') {
                items.sort(function(a, b) {
                    var nameA = a.name.toLowerCase();
                    var nameB = b.name.toLowerCase();
                    if (nameA < nameB) {
                        return -1;
                    } else if (nameA > nameB) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
            }
    
            if (sort === 'nameDes') {
                items.sort(function(a, b) {
                    var nameA = a.name.toLowerCase();
                    var nameB = b.name.toLowerCase();
                    if (nameA > nameB) {
                        return -1;
                    } else if (nameA < nameB) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
            }
    
            if (sort === 'priceAsc') {
                items.sort(function(a, b) {
                    return a.sell - b.sell;
                })
            }
    
            if (sort === 'priceDes') {
                items.sort(function(a, b) {
                    return b.sell - a.sell
                })
            }    
            resolve({
                items: items,
                filtered: filtered
            });
            if (isMounted) {
                _setLoading(true);
            }
        }).then((obj) => {setSortedItems(obj)})
    }

    const setSortedItems = (obj) => {
        if (obj.filtered) {
            setFilteredProducts(obj.items);
        } else {
            setProducts(obj.items);
        }
        if (isMounted) {
            _setLoading(false);
        }
    }

    const productList = products.map((product) => (
        <ProductListing product={product} key={product.itemID}/>
    ))

    const filteredProductList = filteredProducts.map((product) => (
        <ProductListing product={product} key={product.itemID}/>
    ))

    if (_loading) {
        return (
            <LoadIcon/>
        );

    } else if (products.length === 0) {
        return (
            <section className='SearchDetail__container'>
                <p className='SearchDetail__text'>
                    Your search "<span className='SearchDetail__bold'>
                        {props.match.params.search}
                    </span>" returned 0 results.
                </p>
            </section>
        )

    } else if (!filtered) {
        return(
            <section className='SearchDetail__container'>
                <Media query="(min-width: 56.25em)">
                    {matches => matches ? (
                        <SearchFilterDesktop
                            products={products}
                            categoryList={categoryList}
                            applyFilters={(obj) => (applyFilters(obj))}
                            resetFilters={resetFilters}
                            sortItems={(sortOrder) => (sortItems(sortOrder))}
                            sortBy={sortBy}
                        />
                    ) : (
                        <SearchFilter
                            products={products}
                            categoryList={categoryList}
                            applyFilters={(obj) => (applyFilters(obj))}
                            resetFilters={resetFilters}
                            sortItems={(sortOrder) => (sortItems(sortOrder))}
                        />
                    )}
                </Media>
                <div className='SearchDetail__items'>
                    {productList}
                </div>
            </section>
        )
        
    } else if (filteredProducts.length === 0) {
        return(
            <section className='SearchDetail__container'>
                <Media query="(min-width: 56.25em)">
                    {matches => matches ? (
                        <SearchFilterDesktop
                            products={products}
                            categoryList={categoryList}
                            applyFilters={(obj) => (applyFilters(obj))}
                            resetFilters={resetFilters}
                            sortItems={(sortOrder) => (sortItems(sortOrder))}
                            sortBy={sortBy}
                        />
                    ) : (
                        <SearchFilter
                            products={products}
                            categoryList={categoryList}
                            applyFilters={(obj) => (applyFilters(obj))}
                            resetFilters={resetFilters}
                            sortItems={(sortOrder) => (sortItems(sortOrder))}
                        />
                    )}
                </Media>
                <div className='SearchDetail__items'>
                    <p className='SearchDetail__text'>Your filter returned no results. Try a different filter.</p>
                </div>
            </section>
        )
    } else {
        return(
            <section className='SearchDetail__container'>
                <Media query="(min-width: 56.25em)">
                    {matches => matches ? (
                        <SearchFilterDesktop
                            products={products}
                            categoryList={categoryList}
                            applyFilters={(obj) => (applyFilters(obj))}
                            resetFilters={resetFilters}
                            sortItems={(sortOrder) => (sortItems(sortOrder))}
                            sortBy={sortBy}
                        />
                    ) : (
                        <SearchFilter
                            products={products}
                            categoryList={categoryList}
                            applyFilters={(obj) => (applyFilters(obj))}
                            resetFilters={resetFilters}
                            sortItems={(sortOrder) => (sortItems(sortOrder))}
                        />
                    )}
                </Media>
                <div className='SearchDetail__items'>
                    {filteredProductList}
                </div>
            </section>
        )
    }
}

export default SearchList;