import React from 'react'

export default function PurchasedList(props) {
  return (
    <div className='listcon'>
        <p>{props.name}</p>
        <p>{props.id}</p>
        <p>Rs {props.price}eth/per</p>
        <p>{props.storage}</p>
        <button
        
        >Buy</button>
    </div>
  )
}
