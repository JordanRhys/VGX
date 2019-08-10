import React, {useState, useRef, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import './SearchBarDesktop.scss';

import SearchDropdown from './SearchDropdown';

const SearchBarDesktop = (props) => {
    const [input, setInput] = useState('');

    useEffect(() => {
        setInput('');
    }, [props.menuOpen]);
    
    const searchInput = useRef(null);
    
    const redirect = '/search/' + input;
    
    const updateInput = (e) => {
        setInput(e.target.value);
    }

    const validateSubmit = (e) => {
        resetInput();
        e.preventDefault();
        if (input !== '') {
            props.history.push(redirect);
        }
    }

    const resetInput = () => {
        setInput('');
    }

    return (
        <div className='SearchBarDesktop__container'>
            <form className='SearchBarDesktop__form' onSubmit={validateSubmit} autoComplete='off'>
                <input
                    id='SearchBar'
                    className='SearchBarDesktop__input'
                    ref={searchInput}
                    value={input}
                    onChange={updateInput}
                    placeholder="Search..."
                />
                <button className='SearchBarDesktop__submit' type='submit' disabled={input === ''}>
                    <svg className='SearchBarDesktop__submit-svg' viewBox="0 0 20 20">
                        <path d="M17.545 15.467l-3.779-3.779c0.57-0.935 0.898-2.035 0.898-3.21 0-3.417-2.961-6.377-6.378-6.377s-6.186 2.769-6.186 6.186c0 3.416 2.961 6.377 6.377 6.377 1.137 0 2.2-0.309 3.115-0.844l3.799 3.801c0.372 0.371 0.975 0.371 1.346 0l0.943-0.943c0.371-0.371 0.236-0.84-0.135-1.211zM4.004 8.287c0-2.366 1.917-4.283 4.282-4.283s4.474 2.107 4.474 4.474c0 2.365-1.918 4.283-4.283 4.283s-4.473-2.109-4.473-4.474z"></path>
                    </svg>
                </button>
            </form>
            <CSSTransition
                in={input}
                timeout={200}
                classNames='dropdown-transition'
                unmountOnExit
            >
                <SearchDropdown search={input} toggleSearch={resetInput}/>
            </CSSTransition>
        </div>
    )
}

export default withRouter(SearchBarDesktop);