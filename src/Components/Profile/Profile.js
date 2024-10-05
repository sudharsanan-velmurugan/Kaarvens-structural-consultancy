import React from 'react'
import profileImg from '../../Images/profile.jpg'
import { Link, useNavigate } from 'react-router-dom'
import './Profile.css'
import { setLogout } from '../../Slice/LoginSlice'
import { useDispatch, useSelector } from 'react-redux'
import { FaEdit } from "react-icons/fa";
const Profile = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.userInfo.loggedInUser)

  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(setLogout())
    navigate('/')
  }
  const handleEdit = ()=>{
    navigate('/editprofile')

  }
  return (
    <section className='profilepage'>
      <div className='profile-page-container'>
        <h1>Profile</h1>
        <div className='profile-page-image'>
          <img src={profileImg} alt="Profile img" />
        </div>
        <div>

        </div>
        <FaEdit onClick={handleEdit}/>
        <div className='profile-page-fname'>
          <label>First Name :</label>
          <input type='text' value={loggedInUser?.firstName}/>
        </div>
        <div className='profile-page-lname'>
          <label>Last Name :</label>
          <input type='text' value={loggedInUser?.lastName}/>
        </div>
        <div className='profile-page-email'>
          <label>Email Id :   </label>
          <input type='email' value={loggedInUser?.email}/>
        </div>
        <div className='profile-page-mobileno'>
          <label>Mobile No :</label>
          <input type='text' value={loggedInUser?.mobileNo}/>
        </div>
        <div>
          <Link className='profile-page-password' to="/Reset">Change Password</Link>
        </div>
        <div className='profile-page-save'>
          <button type='submit'>Save Changes</button>
        </div>
        <button>
          <Link className='profile-btn' to="/Logout"onClick={handleLogout}>Logout</Link>
          </button> 
      </div>
    </section>

  )
}

export default Profile