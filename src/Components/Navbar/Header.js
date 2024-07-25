import React from 'react'
import Navbar from './Navbar'
import '../Navbar/Navbar.css'
import kvsLogo from '../../Images/kaaravensLogo.png'
const Header = () => {
  return (
    <div className='Header-Container'>
      <div className='imageContainer'>
        <div >
          <img src={kvsLogo} alt="kvsLogo" />
        </div>
        <div>
        <h1>KAARVENS</h1>
        </div>
      </div>
      <div>
        <Navbar />
      </div>
    </div>
  )
}

export default Header