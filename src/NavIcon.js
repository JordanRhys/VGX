import React, { useState, useEffect } from 'react';
import './NavIcon.scss';

import NavBar from './NavBar';

const NavIcon = () => {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (categories.length === 0) {
            fetchCategories()
        }
    })

    const toggleOpen = () => {
        setOpen(!open);
    }

    const fetchCategories = () => {
        fetch('/server/categories', {
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
            setCategories(res)
        });
    }

    return(
        <div className='NavIcon__container'>
            <div
                className='NavIcon__icon-box'
                onClick={toggleOpen}
            >
                <span className='NavIcon__line'/>
                <span className='NavIcon__line'/>
                <span className='NavIcon__line'/>
            </div>

            {(open) ? <NavBar toggleOpen={toggleOpen} categories={categories}/> : null}
        </div>
    )
}

export default NavIcon;