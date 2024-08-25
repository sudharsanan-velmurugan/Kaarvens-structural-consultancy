import React from 'react'
import profileImg from '../../Images/profile.jpg'
import { Link,useNavigate } from 'react-router-dom'
import './Profile.css'
import { setLogout } from '../../Slice/LoginSlice'
import { useDispatch } from 'react-redux'
const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(setLogout())   
    navigate('/') 
  }
  return (
    <div className='profile-page-container'>
       <h1>Profile</h1> 
        <div className='profile-page-image'>
            <img src={profileImg} alt="Profile img" />
        </div>
        <div className='profile-page-fname'>
            <label>First Name :</label>
            <input type='text'></input>
        </div>
        <div className='profile-page-lname'>
            <label>Last Name :</label>
            <input type='text'></input>
        </div>
        <div className='profile-page-email'>
            <label>{" "}Email Id :   </label>
            <input type='email'></input>
        </div>
        <div className='profile-page-mobileno'>
          <label>Mobile No :</label>
          <input type='tel'></input>
        </div>
        <div>
        <Link className='profile-page-password' to="/Reset">Change Password</Link>
        </div>
        <div className='profile-page-save'>
        <button type='submit'>Save Changes</button>
        </div>
        <button className='profile-btn' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile