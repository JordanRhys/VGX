import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import './ProcessOrder.scss';

import {BasketContext} from './App';

const ProcessOrder = () => {
    const [processed, setProcessed] = useState(false);

    const api = useContext(BasketContext);

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify([]));
        window.setTimeout(() => {
            ProcessOrder();
        }, 2000);
    }, []);

    const ProcessOrder = () => {
        setProcessed(true);
        api();
    }

    return (
        <section className='ProcessOrder'>
            {(processed) ? (
                <div className='ProcessOrder__container'>
                    <h2 className='ProcessOrder__complete'>Thank You</h2>
                    <p className='ProcessOrder__text'>Your order has been processed</p>

                    <Link to='/'><button className='ProcessOrder__button'>Return to HomePage</button></Link>
                </div>
            ) : (
                <div className='ProcessOrder__container'>
                    <svg
                        className='ProcessOrder__svg'
                        height='100'
                        width='100'
                    >
                        <circle className='ProcessOrder__circle' r='46' cx='50' cy='50'/>
                    </svg>
                    <p className='ProcessOrder__text'>Processing Order</p>
                </div>
            )}
        </section>
    );
}

export default ProcessOrder;