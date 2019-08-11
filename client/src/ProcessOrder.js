import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import './ProcessOrder.scss';

import {BasketContext} from './App';

const ProcessOrder = (props) => {
    const [processed, setProcessed] = useState(false);

    const api = useContext(BasketContext);

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify([]));
        UpdateStock();
        window.setTimeout(() => {
            ProcessOrder();
        }, 2000);
    }, []);

    const UpdateStock = () => {
        let idArray = [];
        props.products.forEach((product) => {
            idArray.push(product._id);
        })

        fetch('/server/updatestock/' + idArray.join(','), {
            headers: {
                Accept: 'application/json'
            }
        }).then(function(res) {
            if (res.status >= 200 && res.status <= 300) {
                console.log(res);
            } else {
                console.log(res.status);
            }
        });
    }

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