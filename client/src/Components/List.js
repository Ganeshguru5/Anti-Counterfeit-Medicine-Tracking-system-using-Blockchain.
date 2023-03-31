import React from 'react'
import "../Styles/List.css"

export default function List(props) {
  return (
    <div className='listcon'>
        <p>{props.name}</p>
        <p>{props.id}</p>
        <p>Rs {props.price}eth/per</p>
        <p>{props.storage}</p>
        <button
        className='buybtn'
        >Buy</button>
    </div>
  )
}
