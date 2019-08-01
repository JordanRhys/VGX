import React from 'react';
import {Link} from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {

    const focusSearch = () => {
        document.getElementById('SearchBar').focus();
    }

    return (
        <div className='NotFound__missing-container'>
            <h2 className='NotFound__missing-header'>Oops, this link seems to be broken</h2>
            <p
                className='NotFound__missing-text'
                onClick={focusSearch}
            >Try a new search,</p>
            <Link to='/'><p className='NotFound__missing-text'>or visit our HomePage?</p></Link>
        </div>
    )
}

export default NotFound;