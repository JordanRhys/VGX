import React, {useState, useRef} from 'react';
import {withRouter} from 'react-router-dom';
import './SearchBar.scss';

import SearchDropdown from './SearchDropdown';

const SearchBar = (props) => {
    const [input, setInput] = useState('');
    
    const searchInput = useRef(null);
    
    const redirect = '/search/' + input;
    
    const updateInput = (e) => {
        setInput(e.target.value);
    }

    const clearInput = () => {
        setInput('');
        searchInput.current.focus();
    }

    const validateSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        if (input !== '') {
            props.toggleSearch();
            props.history.push(redirect);
        }
    }

    return (
        <div className='SearchBar__container'>
            <form className='SearchBar__form' onSubmit={validateSubmit}>
                <input
                    className='SearchBar__input'
                    autoFocus
                    ref={searchInput}
                    value={input}
                    onChange={updateInput}
                />
                {(input) ? (
                    <button className='SearchBar__submit' type='submit' disabled={input === ''}>
                        <svg className='SearchBar__submit-svg' viewBox="0 0 20 20">
                            <path d="M17.545 15.467l-3.779-3.779c0.57-0.935 0.898-2.035 0.898-3.21 0-3.417-2.961-6.377-6.378-6.377s-6.186 2.769-6.186 6.186c0 3.416 2.961 6.377 6.377 6.377 1.137 0 2.2-0.309 3.115-0.844l3.799 3.801c0.372 0.371 0.975 0.371 1.346 0l0.943-0.943c0.371-0.371 0.236-0.84-0.135-1.211zM4.004 8.287c0-2.366 1.917-4.283 4.282-4.283s4.474 2.107 4.474 4.474c0 2.365-1.918 4.283-4.283 4.283s-4.473-2.109-4.473-4.474z"></path>
                        </svg>
                    </button>
                ) : null}
                {(input) ? (
                    <div className='SearchBar__close' onClick={clearInput}>&#10006;</div>
                ) : null}
            </form>
            <SearchDropdown search={input} toggleSearch={props.toggleSearch}/>
        </div>
    )
}

export default withRouter(SearchBar);