import React from 'react'
import './rating.scss'

export default function Rating({rating}) {
    return (
        <div >
        {Array(rating).fill().map(()=>{
            return <span>🌟</span>
        })}
    </div>
    )
}
