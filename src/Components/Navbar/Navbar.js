import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Navbar/Navbar.css'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {
  
  const isUserLogin = useSelector((state) => state.loginInfo.isUserLogin)
  const isAdminLogin = useSelector((state) => state.loginInfo.isAdminLogin)

 

  return (
    <div className='Nav-Container'>
      <ul>
        <li><Link className='nav-elements' to="/">Home</Link></li>
        <li><Link className='nav-elements' to="/About">About</Link></li>
        <li><Link className='nav-elements' to="/Projects">Projects</Link></li>
        <li><Link className='nav-elements' to="/Contact">Contact</Link></li>
        {isAdminLogin && (
          <li><Link className='nav-elements' to="/users">Users</Link></li>
        )}
        {(isUserLogin || isAdminLogin) && (
          <>
            <li><Link className='nav-elements' to="/Forgot">Forgot</Link></li>
            <li><Link className='nav-elements' to="/Reset">Reset</Link></li>
            <li><Link className='nav-elements' to="/profile">Profile</Link></li>
            <li>
             
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default Navbar
