import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import './NavBar.scss';

const NavBar = (props) => {
    const [catOpen, setCatOpen] = useState(false);

    // const links = props.categories.map((cat) => {
    //     return(
            
    //     )
    // })

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
                            className='NavBar__link'
                            onClick={toggleCatOpen}
                        >Shop Products &or;</li>
                    ) : (
                        <li
                            className='NavBar__link'
                            onClick={toggleCatOpen}
                        >Shop Products</li>
                    )}
                    <CSSTransition
                        in={catOpen}
                        timeout={400}
                        classNames='catlist-transition'
                        unmountOnExit
                    >
                    <ul className='NavBar__cat-list'>
                        {props.categories.map((cat) => (
                                <Link onClick={props.toggleOpen} key={cat.name} to={'/category/' + cat.name}>
                                    <li className='NavBar__link'>{cat.name}</li>
                                </Link>
                        ))}
                    </ul>
                    </CSSTransition>
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