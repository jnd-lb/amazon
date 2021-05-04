import React, { useState,useEffect } from 'react'
import './payment.scss'
import { useStateValue } from './../StateProvider'
import CartProduct from '../CartProduct/CartProduct'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import {getBasketTotal} from '../reducer'
import { useHistory } from 'react-router'

export default function Payment() {
    const BASE_URL = "http://localhost:5001/app-b56f6/us-central1/api";
    const [{ basket }, dispatch] = useStateValue()
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState()
    const [suceeded, setSuceeded] = useState(false)
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const history = useHistory();

    const handelSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            setSuceeded(true);
            setError(null);
            setProcessing(false);
            
            dispatch({
                type:"EMPTY_BASKET"
            })

            history.replace("/order");
        })
    }

    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "") ;
    }

    useEffect(() => {
        const getClientSecret = async ()=>{
            const response = await fetch(
                `${BASE_URL}/payment/create?total=${getBasketTotal(basket)*100}`,
                {method:"POST"}
            );
            const data = await response.json();
            console.log("Server response:",data);
            setClientSecret(data.clientSecret)
        }
        getClientSecret();
    }, [basket])


    return (
        <div className="payment">
            <div className="payment__delivery">
                <h3>Delivery Address</h3>
                <p>email@domain.com</p>
                <p>123 Address Line 1</p>
                <p>City Name, Country Name</p>
            </div>

            <div className="payment__items">
                <h3>Review Items and Delivery</h3>
                {basket.map(p => (
                    <CartProduct
                        key={p.item.id}
                        {...p}
                    />
                ))}
            </div>
            <div className="payment__method">
                <form onSubmit={handelSubmit} action="">
                    <CardElement onChange={handleChange} />
                </form>

                <CurrencyFormat
                    renderText={(value) => (
                        <>
                            <p>Subtotal (0 items) : <strong>{value}</strong>
                            </p>
                            <small className="subtotal__gift">
                                <input type="checkbox" name="" id="" />
                            this order contains a gift
                         </small>
                        </>
                    )}

                    value={getBasketTotal(basket)}

                    displayType={"text"}
                    thusandsSeparator={true}
                    prefix={"$"}
                >

                </CurrencyFormat>

                <button disabled={disabled||processing||suceeded} onClick={handelSubmit}>{processing?"Processing":"Buy Now"}</button>
                <div className="payment__error">
                    {error && error}
                </div>
            </div>
        </div>
    )
}
