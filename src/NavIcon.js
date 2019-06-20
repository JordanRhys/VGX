import React from 'react';
import './NavIcon.scss';

import NavBar from './NavBar';

const NavIcon = (props) => {

    return(
        <div className='NavIcon__container' onClick={props.toggleMenu}>
            <div className='NavIcon__icon-box'>
                <span className='NavIcon__line'/>
                <span className='NavIcon__line'/>
                <span className='NavIcon__line'/>
            </div>
        </div>
    )
}

export default NavIcon;