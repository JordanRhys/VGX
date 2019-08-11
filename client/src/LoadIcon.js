import React from 'react';
import './LoadIcon.scss';

const LoadIcon = () => {
    return (
        <div className='LoadIcon__container'>
            <svg
                className='LoadIcon__svg'
                height='100'
                width='100'
            >
                <circle className='LoadIcon__circle' r='46' cx='50' cy='50'/>
            </svg>
        </div>
    )
}

export default LoadIcon;