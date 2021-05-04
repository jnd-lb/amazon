import React from 'react'
import {useStateValue} from '../StateProvider'

export default function Counter({count,id}) {
const [{basket},dispatch] = useStateValue();

const handleIncrease=()=>{
    dispatch({
        type:"INCREASE_COUNT",
        id: id
    })
}

const handleDecreasase = ()=>{
    dispatch({
        type:"DECREASE_COUNT",
        id:id
    })
}

return (
        <div>
            <button onClick={handleIncrease}> + </button>
            <span>{count}</span>
            <button onClick={handleDecreasase}> - </button>
        </div>
    )
}