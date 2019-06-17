import React from 'react';
import {Link} from 'react-router-dom';
import './NavBar.scss';

const NavBar = (props) => {

    const links = props.categories.map((cat) => {
        return(
            <Link onClick={props.toggleOpen} key={cat.name} to={'/category/' + cat.spaceless_name}>
                <li className='NavBar__link'>{cat.name}</li>
            </Link>
        )
    })


    return(
        <div className='NavBar__greyout'>
            <nav className='NavBar__container'>
                <ul className='NavBar__list'>
                    {links}
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;