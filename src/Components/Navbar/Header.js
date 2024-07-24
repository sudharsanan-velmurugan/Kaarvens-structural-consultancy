import React from 'react'
import Navbar from './Navbar'
import '../Navbar/Navbar.css'
const Header = () => {
  return (
    <div>
        <div className='Header-Container'>
            <h1>KAARVENS</h1>
        </div>
        <Navbar/>
    </div>
  )
}

export default Header