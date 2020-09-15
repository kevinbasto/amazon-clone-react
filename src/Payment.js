import React, { useEffect, useState } from 'react'
import './Payment.css'
import {useStateValue} from './StateProvider'
import Item from './Item';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();

    const history = useHistory();

    const stripe = useStripe();
    const element = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(""); 

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const  [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        //generate the special stripe secret which allow us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Strip expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();
    }, [basket]);

    const  handleSubmit = async event => {
        //do stripe stuff
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: element.getElement(CardElement)
            }
        }).then( ({ paymentIntent }) => {
            //paymentIntent = payment confirmation

            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })
            console.log(paymentIntent);

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET',
            })

            history.replace('/orders')
        })
        .catch( error => {

        })
        
        //const payload = await stripe.
    }

    const handleChange = event => {
        //Listen for changes in the CardElement
        //and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error? event.error.message : "" );

    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (
                        <Link to="/checkout"> {basket?.length} items </Link>
                    )
                </h1>

                {/** Payment section - delivary address */}
                <div className="payment__section"> 
                    <div className="payment__title">
                        <h3>Delivery Address</h3>                        
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>Street react</p>
                        <p>Mérida, Yucatán</p>
                    </div>
                </div>
                {/** Payment section - review items*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <Item 
                                id = {item.id}
                                title={item.title}
                                image={item.image}
                                price ={item.price}
                                rating={item.rating}
                            />
                            
                        ))}
                    </div>
                </div>
                {/** Pay,emt sectopm - Payment method */}
                <div className="payment__section"> 
                    <div className="payment__title">
                        <h3>Payment method</h3>
                    </div>
                    <div className="payment__details">
                        {/** Stripe magic will go here */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className="payment__priceContainer">
                                <CurrencyFormat 
                                    renderText = {(value) => (
                                        <h3>Order total: {value} </h3>  )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />

                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> :
                                        "Buy Now"}
                                    </span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
