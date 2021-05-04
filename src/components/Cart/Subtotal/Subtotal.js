import React,{useEffect, useState} from 'react'
import "./subtotal.scss";
import CurrencyFormat from 'react-currency-format'
import {useStateValue} from '../../StateProvider'
import {useHistory} from 'react-router-dom'

export default function Subtotal() {
    const [{basket},dispatch]= useStateValue();
    const [total, setTotal]= useState(0);
    const history = useHistory();

    useEffect(()=>{
        const finaltotal = basket.reduce((_total,currentItem)=>{
            _total+= +currentItem.item.price*currentItem.count;
            return _total;
        },0)

        setTotal(finaltotal);
    },[basket])

    return (
        <div className="subtotal">
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

                value={total}

                displayType={"text"}
                thusandsSeparator={true}
                prefix={"$"}
            >

            </CurrencyFormat>

            <button onClick={()=>{history.push("/payment")}} className="subtotal__button">Proceed to checkout</button>

        </div>
    )
}
