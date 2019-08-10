import React from 'react';
import { Link } from 'react-router-dom';
import './BasketIcon.scss';

const BasketIcon = (props) => {

    return (
        <Link to='/basket' onClick={props.closeAll}>
            <div
                className='BasketIcon__container'
            >
                <svg className='BasketIcon__svg' viewBox="0 0 32 28">
                    <path d="M10 24c0 1.094-0.906 2-2 2s-2-0.906-2-2 0.906-2 2-2 2 0.906 2 2zM24 24c0 1.094-0.906 2-2 2s-2-0.906-2-2 0.906-2 2-2 2 0.906 2 2zM26 7v8c0 0.5-0.391 0.938-0.891 1l-16.312 1.906c0.078 0.359 0.203 0.719 0.203 1.094 0 0.359-0.219 0.688-0.375 1h14.375c0.547 0 1 0.453 1 1s-0.453 1-1 1h-16c-0.547 0-1-0.453-1-1 0-0.484 0.703-1.656 0.953-2.141l-2.766-12.859h-3.187c-0.547 0-1-0.453-1-1s0.453-1 1-1h4c1.047 0 1.078 1.25 1.234 2h18.766c0.547 0 1 0.453 1 1z"></path>
                </svg>
                {(props.basketItems > 0) ? (
                    <div className='BasketIcon__dot'>
                        {props.basketItems}
                    </div>
                ) : null}
            </div>
        </Link>
    )
}

export default BasketIcon;