import React from 'react'
import Rating from '../Rating/Rating';
import "./cartproduct.scss";
import {useStateValue} from '../StateProvider'
import Counter from '../Counter/Counter';


export default function CartProduct(props) {
    const [{basket},dispatch]= useStateValue();
    const {rating,id,description,image,price} = props.item;
    const count = props.count;

    const remove = ()=>{
        dispatch({
            type: "REMOVE_FROM_BASKET",
            item:{
                id:id
            }
        })    
    }
    return (
        <div className="cartproduct">
            <img src={image} />
            <div className="cartproduct__info">
                <p>{description}</p>
                <div>
                    <small>$</small>
                    <strong>{price}</strong>
                </div>
                <Rating rating={rating}/>
                <Counter
                   count={count}
                   id={id}
                   />
                <button onClick={remove}>remove</button>
            </div>
        </div>
    )
}
