import React from 'react'
import Rating from '../Rating/Rating'
import "./product.scss"
import {useStateValue} from '../StateProvider'

export default function Product({description, image,rating, price,id}) {
    const [{basket}, dispatch] = useStateValue();

console.log("Basket:",basket)
    const addToBasket = ()=>{

        dispatch({
            type:"ADD_TO_BASKET",
            item:{
                image,
                description,
                rating,
                price,
                id
            }
        })
    }

    return (
        <div className="product">
            <div className="product__info">
                <p className="product__info__description">
                        {description}
                </p>
                <p className="product__info__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <Rating rating={rating}/>

            </div>

            <img src={image} alt=""/>
            <button onClick={()=>addToBasket()}>Add to cart</button>
        </div>
    )
}
