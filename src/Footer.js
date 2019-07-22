import React from 'react';
import './Footer.scss';

const Footer = () => {

    return (
        <footer className='Footer__container'>
            <img
                className='Footer__img'
                src={process.env.PUBLIC_URL + '/VGX.png'}
                alt='VGX Logo'
            />
            <p className='Footer__text'>
                Video Game eXchange (VGX), is a portfolio project from JordanRhys.dev
            </p>
        </footer>
    );
}

export default Footer;