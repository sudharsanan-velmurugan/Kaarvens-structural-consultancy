import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Navbar/Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from '../../Slice/LoginSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoginFalse = useSelector((state) => state.loginInfo.isLogin)
  const handleLogout = () => {
    dispatch(setLogin())
    navigate('/')
  }
  return (
    <div className='Nav-Container'>
      <ul>
        <li> <Link className='nav-elements' to="/">Home</Link></li>
        <li> <Link className='nav-elements' to="/About">About</Link></li>
        <li> <Link className='nav-elements' to="/Services">Services</Link></li>
        <li> <Link className='nav-elements' to="/Contact">Contact</Link></li>
        {isLoginFalse && <> (<li> <Link className='nav-elements' to="/Forgot">Forgot</Link></li>
          <li> <Link className='nav-elements' to="/Reset">Reset</Link></li>
          <li> <button className='nav-elements' onClick={handleLogout}>Logut</button></li>)
        </>}
      </ul>

    </div>
  )
}

export default Navbar