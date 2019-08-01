import React from 'react';
import './About.scss';

const About = () => {

    return (
        <div className='About__container'>
            <h3 className='About__header'>We are VGX</h3>
            <p className='About__text'>We buy, sell and exchange video games, consoles and accessories, allowing you to game for less and sell items to us, rather than filling up landfill.</p>
            <p className='About__tagline'>Welcome to the <span className='About__green'>Green</span> gaming revolution</p>
        </div>
    )
}

export default About;