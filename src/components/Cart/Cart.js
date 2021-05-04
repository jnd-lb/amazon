import React from 'react'
import CartProduct from '../CartProduct/CartProduct'
import "./cart.scss"
import Subtotal from './Subtotal/Subtotal'
import {useStateValue} from '../StateProvider'


export default function Cart() {
    const [{basket},dispatch]= useStateValue();
    return (
        <div className="row cart">
            {console.log(">>",basket)}
            <div className="col-md-7 cart__products__container">
                <div className="cart__products__header">
                    <h2>Your Shopping Basket</h2>
                    <hr />
                </div>

                <div className="cart_products__list">
                    {basket.map(p=>(
                        <CartProduct key={p.id}
                            {...p}
                        />
                    ))}
                </div>
            </div>

            <div className="col-md-5 cart__subtotal__container">
                <Subtotal/>
            </div>
        </div>
    )
}
