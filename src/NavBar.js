import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './NavBar.scss';

const NavBar = (props) => {
    const [catOpen, setCatOpen] = useState(false);

    const links = props.categories.map((cat) => {
        return(
            <Link onClick={props.toggleOpen} key={cat.name} to={'/category/' + cat.spaceless_name}>
                <li className='NavBar__link'>{cat.name}</li>
            </Link>
        )
    })

    const toggleCatOpen = () => {
        setCatOpen(!catOpen);
    };

    return(
        <div className='NavBar'>
            <nav className='NavBar__container'>
                <ul className='NavBar__list'>
                    <Link onClick={props.toggleOpen} to={'/'}>
                        <li className='NavBar__link'>Homepage</li>
                    </Link>
                    <Link onClick={props.toggleOpen} to={'/about'}>
                        <li className='NavBar__link'>About VGX</li>
                    </Link>
                    {catOpen ? (
                        <li
                            className='NavBar__link NavBar__link--active'
                            onClick={toggleCatOpen}
                        >Shop Products &or;</li>
                    ) : (
                        <li
                            className='NavBar__link'
                            onClick={toggleCatOpen}
                        >Shop Products</li>
                    )}
                    {catOpen ? (
                        <ul className='NavBar__cat-list'>
                            {links}
                        </ul>
                    ) : null}
                </ul>
            </nav>
            <div 
                className='NavBar__greyout'
                onClick={props.toggleOpen}
            ></div>
        </div>
    )
}

export default NavBar;