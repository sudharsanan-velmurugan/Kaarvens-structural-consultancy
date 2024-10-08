import React, { useState } from 'react';
import profileImg from '../../Images/profile.jpg';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { setLogout } from '../../Slice/LoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const Profile = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.userInfo.loggedInUser);
  const navigate = useNavigate();

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleLogout = () => {
    dispatch(setLogout());
    navigate('/');
  };

  // Navigate to edit profile
  const handleEditProfile = () => {
    navigate('/editprofile');
  };

  // Toggle the password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="container my-3 d-flex justify-content-center">
      <div className="card shadow-lg p-4" style={{ width: '600px' }}>
        <h1 className="text-center mb-4">Profile</h1>
        <div className="text-center mb-4">
          <img src={profileImg} alt="Profile" className="rounded-circle" width="150" height="150" />
        </div>
  
        <div className="mb-3 row justify-content-center">
          <label className="col-sm-3 col-form-label text-right">First Name:</label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              value={loggedInUser?.firstName}
              readOnly
            />
          </div>
        </div>
  
        <div className="mb-3 row justify-content-center">
          <label className="col-sm-3 col-form-label text-right">Last Name:</label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              value={loggedInUser?.lastName}
              readOnly
            />
          </div>
        </div>
  
        <div className="mb-3 row justify-content-center">
          <label className="col-sm-3 col-form-label text-right">Email ID:</label>
          <div className="col-sm-7">
            <input
              type="email"
              className="form-control"
              value={loggedInUser?.email}
              readOnly
            />
          </div>
        </div>
  
        <div className="mb-3 row justify-content-center">
          <label className="col-sm-3 col-form-label text-right">Mobile No:</label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              value={loggedInUser?.mobileNo}
              readOnly
            />
          </div>
        </div>
  
        {/* Password Field with Eye Toggle */}
        <div className="mb-3 row justify-content-center">
          <label className="col-sm-3 col-form-label text-right">Password:</label>
          <div className="col-sm-7 d-flex">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              value={loggedInUser?.password}
              readOnly
            />
            <button
              type="button"
              className="btn btn-outline-secondary ms-2"
              onClick={togglePasswordVisibility}
              style={{ width: '40px' }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
  
        {/* Buttons for Logout and Edit Profile */}
        <div className="text-center d-flex justify-content-center mt-4">
          <button
            className="btn btn-primary me-2"
            style={{ width: '200px' }}
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
          <button
            className="btn btn-danger"
            style={{ width: '200px' }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
  
};

export default Profile;
