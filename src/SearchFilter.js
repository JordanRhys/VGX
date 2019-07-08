import React, {useState} from 'react';
import './SearchFilter.scss';

const SearchFilter = (props) => {
    const [sortOpen, setSortOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(999);
    const [stockCheck, setStockCheck] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const toggleFilter = () => {
        if (filterOpen) {
            setFilterOpen(false);
        } else {
            setSortOpen(false);
            setFilterOpen(true);
        }
    }

    const toggleSort = () => {
        if (sortOpen) {
            setSortOpen(false);
        } else {
            setFilterOpen(false);
            setSortOpen(true);
        }
    }

    const changeMin = (e) => {
        setMin(e.target.value);
    }

    const changeMax = (e) => {
        setMax(e.target.value);
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
        toggleFilter();
        props.applyFilters({
            min: parseFloat(min),
            max: parseFloat(max),
            categories: selectedCategories,
            stocked: stockCheck
        })
    }

    const resetFilters = () => {
        toggleFilter();
        setMin(0);
        setMax(999);
        setSelectedCategories([]);
        setStockCheck(false);
        props.resetFilters();
    }

    const sortItems = (sort) => {
        toggleSort();
        props.sortItems(sort);
    }

    // <li> for each Unselected category
    const categoryList = props.categoryList.filter((allcat) => (
        selectedCategories.indexOf(allcat) === -1
    )).map((cat) => (
        <li
            className='SearchFilter__filter-item'
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
            className='SearchFilter__filter-item'
            key={cat}
            onClick={(cat) => {
                unselectCategory(cat.target.innerHTML);
            }}
        >
            {cat}
        </li>
    ))

    return(
        <div className='SearchFilter__container'>
            <div
                className='SearchFilter__filter'
                onClick={toggleFilter}
            >
                Filter
            </div>
            <div
                className='SearchFilter__sort'
                onClick={toggleSort}
            >
                Sorting
            </div>

            {/* FILTER OPEN */}
            {(filterOpen) ? (
                <div className='SearchFilter__filter-panel'>

                    <p className='SearchFilter__header'>Price:</p>
                    <div className='SearchFilter__price'>
                        £<input className='SearchFilter__price-input' type='number' value={min} onChange={changeMin}/>
                        &nbsp;- £<input className='SearchFilter__price-input' type='number' value={max} onChange={changeMax}/>
                    </div>


                    <p className='SearchFilter__header'>Product Lines:</p>
                    {(selectedCategoryList.length === 0) ? null : (
                        <>
                            <p className='SearchFilter__sub-header'>Selected:</p>
                            <ul className='SearchFilter__filter-list'>
                                {(selectedCategoryList.length === 0) ? (
                                    <li className='SearchFilter__filter-item'>None</li>
                                ) : selectedCategoryList}
                            </ul>
                            <p className='SearchFilter__sub-header'>Unselected:</p>
                        </>
                    )}
                    <ul className='SearchFilter__filter-list'>
                        {(categoryList.length === 0) ? (
                            <li className='SearchFilter__filter-item'>None</li>
                        ) : categoryList}
                    </ul>


                    <p className='SearchFilter__header'>More Filters:</p>
                    <div className='SearchFilter__checkbox-row'>
                        <label className='SearchFilter__label' htmlFor='stockCheck'>In stock only:</label>
                        <input id='stockCheck' type='checkbox' value={stockCheck} onChange={toggleStockCheck}/>
                        {(stockCheck) ? (
                            <span className='Universal__checkbox'>
                                <span className='Universal__checkbox-check'>&#x2714;</span>
                            </span>
                        ) : (
                            <span className='Universal__checkbox'></span>
                        )}
                    </div>


                    <div className='SearchFilter__button-row'>
                        <button
                            className='Universal__button'
                            onClick={applyFilters}
                        >
                            Apply Filters
                        </button>
                        <button
                            className='Universal__button Universal__button--cancel'
                            onClick={resetFilters}
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>
            ) : null}

            {/* SORT OPEN */}
            {(sortOpen) ? (
                <ul className='SearchFilter__sort-container'>
                    <li 
                        className='SearchFilter__sort-item'
                        onClick={() => (sortItems('nameAsc'))}
                    >
                        <span>A&uarr;</span>   Name: Ascending
                    </li>
                    <li 
                        className='SearchFilter__sort-item'
                        onClick={() => (sortItems('nameDes'))}
                    >
                        <span>A&darr;</span>   Name: Descending
                    </li>
                    <li 
                        className='SearchFilter__sort-item'
                        onClick={() => (sortItems('priceAsc'))}
                    >
                        <span>£&uarr;</span>   Price: Ascending
                    </li>
                    <li 
                        className='SearchFilter__sort-item'
                        onClick={() => (sortItems('priceDes'))}
                    >
                        <span>£&darr;</span>   Price: Descending
                    </li>
                </ul>
            ) : null}
        </div>
    )
}

export default SearchFilter;