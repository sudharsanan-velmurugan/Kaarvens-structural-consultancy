import React from 'react'
import { Link } from 'react-router-dom'
import '../Navbar/Navbar.css'
import { useSelector } from 'react-redux'
import { FaHome, FaEdit, FaUsers, FaUser, FaThList,FaTasks,FaRupeeSign  } from "react-icons/fa";


const Navbar = () => {
  
  const isUserLogin = useSelector((state) => state.loginInfo.isUserLogin)
  const isAdminLogin = useSelector((state) => state.loginInfo.isAdminLogin)
  return (
    <div className='Nav-Container'>
      <ul>
        <li><Link className='nav-elements' to="/"><FaHome /></Link></li>
        <li><Link className='nav-elements' to="/about"><FaEdit /></Link></li>
        <li><Link className='nav-elements' to="/projects"><FaThList /></Link></li>
        {isAdminLogin && (
          <li><Link className='nav-elements' to="/users"><FaUsers /></Link></li>
        )}
        {(isUserLogin || isAdminLogin) && (
          <>
            {/* <li><Link className='nav-elements' to="/forgot">Forgot</Link></li> */}
            {/* <li><Link className='nav-elements' to="/reset">Reset</Link></li> */}
            <li><Link className='nav-elements' to="/tasks"><FaTasks /></Link></li>
            <li><Link className='nav-elements' to="/finance"><FaRupeeSign /></Link></li>
            <li><Link className='nav-elements' to="/profile"><FaUser /></Link></li>
          </>
        )}
      </ul>
    </div>
  )
}

export default Navbar
