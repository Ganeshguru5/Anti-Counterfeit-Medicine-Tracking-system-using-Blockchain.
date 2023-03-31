import React from 'react'
import "../Styles/Nav.css"
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <div className='Navbar'>
        <div className='Nav1'>
            <p className='title'>Hinata care</p>
        </div>
        <div className='Nav2'>
          <Link to='/Login'>
            <button className='prologin'>Login</button>
            </Link>
        </div>
    </div>
  )
}
