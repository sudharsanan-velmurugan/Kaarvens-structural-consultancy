import React from 'react'
import profileImg from '../../Images/profile.jpg'
import { Link, useNavigate } from 'react-router-dom'
import './Profile.css'
import { setLogout } from '../../Slice/LoginSlice'
import { useDispatch, useSelector } from 'react-redux'
const Profile = () => {
  const dispatch = useDispatch()
  const loginMail = useSelector((state) => state.userInfo.loggedInUser)
  const users = useSelector((state) => state.userInfo.users)
  const loggedInUser = users.find((user) => user.email === loginMail)
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(setLogout())
    navigate('/')
  }
  return (
    <section className='profilepage'>
      <div className='profile-page-container'>
        <h1>Profile</h1>
        <div className='profile-page-image'>
          <img src={profileImg} alt="Profile img" />
        </div>
        <div className='profile-page-fname'>
          <label>First Name :</label>
          <input type='text' value={loggedInUser?.firstName}></input>
        </div>
        <div className='profile-page-lname'>
          <label>Last Name :</label>
          <input type='text' value={loggedInUser?.lastName}></input>
        </div>
        <div className='profile-page-email'>
          <label>Email Id :   </label>
          <input type='email' value={loggedInUser?.email}></input>
        </div>
        <div className='profile-page-mobileno'>
          <label>Mobile No :</label>
          <input type='text' value={loggedInUser?.mobile}></input>
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