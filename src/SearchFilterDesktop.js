import React, { useState, useEffect } from 'react';
import './SearchFilterDesktop.scss';

const SearchFilterDesktop = (props) => {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(999);
    const [sort, setSort] = useState(props.sortBy);
    const [stockCheck, setStockCheck] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        setSort('');
    }, [props.products])

    const changeMin = (e) => {
        setMin(e.target.value);
    }

    const changeMax = (e) => {
        setMax(e.target.value);
    }

    const changeSort = (e) => {
        setSort(e.target.value);
        sortItems(e.target.value);
    }

    const toggleStockCheck = () => {
        setStockCheck(!stockCheck);
    }

    const selectCategory = (cat) => {
        setSelectedCategories([...selectedCategories, cat]);
    }

    const unselectCategory = (category) => {
        const filtered = selectedCategories.filter((cat) => (
            cat !== category
        ));
        setSelectedCategories(filtered);
    }

    const applyFilters = () => {
        props.applyFilters({
            min: parseFloat(min),
            max: parseFloat(max),
            categories: selectedCategories,
            stocked: stockCheck
        })
    }

    const resetFilters = () => {
        setMin(0);
        setMax(999);
        setSelectedCategories([]);
        setStockCheck(false);
        props.resetFilters();
    }

    const sortItems = (sort) => {
        props.sortItems(sort);
    }

    // <li> for each Unselected category
    const categoryList = props.categoryList.filter((allcat) => (
        selectedCategories.indexOf(allcat) === -1
    )).map((cat) => (
        <li
            className='SearchFilterDesktop__filter-item'
            key={cat}
            onClick={(cat) => {
                selectCategory(cat.target.innerHTML);
            }}
        >
            {cat}
        </li>
    ));

    // <li> for each Selected category
    const selectedCategoryList = selectedCategories.map((cat) => (
        <li
            className='SearchFilterDesktop__filter-item'
            key={cat}
            onClick={(cat) => {
                unselectCategory(cat.target.innerHTML);
            }}
        >
            {cat}
        </li>
    ))

    return(
        <div className='SearchFilterDesktop__container'>

            <div className='SearchFilterDesktop__sub-container'>
                <p className='SearchFilterDesktop__header'>Sort:</p>
                <select className='SearchFilterDesktop__dropdown' onChange={changeSort} value={sort}>
                    <option value="">Sort By</option>
                    <option value="nameAsc">Name: Ascending</option>
                    <option value="nameDes">Name: Descending</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDes">Price: High to Low</option>
                </select>
            </div>

            <div className='SearchFilterDesktop__sub-container'>
                <p className='SearchFilterDesktop__header'>Filters:</p>

                <p className='SearchFilterDesktop__small-header'>Price:</p>
                <div className='SearchFilter__price'>
                    £<input className='SearchFilterDesktop__price-input' type='number' value={min} onChange={changeMin}/>
                    &nbsp;- £<input className='SearchFilterDesktop__price-input' type='number' value={max} onChange={changeMax}/>
                </div>

                <p className='SearchFilterDesktop__small-header'>Product Lines:</p>
                {(selectedCategoryList.length === 0) ? null : (
                    <>
                        <p className='SearchFilterDesktop__sub-header'>Selected:</p>
                        <ul className='SearchFilterDesktop__filter-list'>
                            {(selectedCategoryList.length === 0) ? (
                                <li className='SearchFilterDesktop__filter-item'>None</li>
                            ) : selectedCategoryList}
                        </ul>
                        <p className='SearchFilterDesktop__sub-header'>Unselected:</p>
                    </>
                )}
                <ul className='SearchFilterDesktop__filter-list'>
                    {(categoryList.length === 0) ? (
                        <li className='SearchFilterDesktop__filter-item'>None</li>
                    ) : categoryList}
                </ul>

                <p className='SearchFilterDesktop__small-header'>More Filters:</p>
                <div className='SearchFilterDesktop__checkbox-row'>
                    <input id='stockCheck' type='checkbox' value={stockCheck} onChange={toggleStockCheck}/>
                    <label className='SearchFilterDesktop__label' htmlFor='stockCheck'>In stock only:</label>
                    {(stockCheck) ? (
                        <span className='Universal__checkbox'>
                            <span className='Universal__checkbox-check'>&#x2714;</span>
                        </span>
                    ) : (
                        <span className='Universal__checkbox'></span>
                    )}
                </div>

                <div className='SearchFilterDesktop__button-row'>
                    <button
                        className='SearchFilterDesktop__button'
                        onClick={applyFilters}
                    >
                        Apply Filters
                    </button>
                    <p
                        className='SearchFilterDesktop__reset'
                        onClick={resetFilters}
                    >
                        Reset Filters
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SearchFilterDesktop;