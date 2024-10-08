import React, { useState } from 'react';
import profileImg from '../../Images/profile.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { setLogout } from '../../Slice/LoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons for toggle
import { setLoggedInUser } from "../../Slice/UserSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.userInfo.loggedInUser);
  const navigate = useNavigate();

  // Set initial form state from the logged-in user info
  const [formInput, setFormInput] = useState({
    id:loggedInUser?.id||0,
    firstName: loggedInUser?.firstName || '',
    lastName: loggedInUser?.lastName || '',
    email: loggedInUser?.email || '',
    mobileNo: loggedInUser?.mobileNo || '',
    password: loggedInUser?.password || '', // Assuming password is stored in user state
  });

  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleBack = () => {
    navigate('/profile');
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSaveChanges = () => {
    // Construct the updated data
    const updatedData = {
      ...loggedInUser,
      id:formInput.id,
      firstName: formInput.firstName,
      lastName: formInput.lastName,
      email: formInput.email,
      mobileNo: formInput.mobileNo,
      password: formInput.password, // Include updated password
    };

    // Make a PUT request to update the user details in the backend
    fetch(`https://localhost:7175/api/UserDetails/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formInput),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        alert('Profile updated successfully!');
        dispatch(setLoggedInUser(formInput));
        navigate('/profile')
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      });
  };

  return (
    <section className="container my-3 d-flex justify-content-center ">
      <div className="card shadow-lg p-4  " style={{ width: '600px' }}>
        <h1 className="text-center mb-4">Edit Profile</h1>
        <div className="text-center mb-4">
          <img src={profileImg} alt="Profile" className="rounded-circle" width="150" height="150" />
        </div>

        {/* First Name */}
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">First Name:</label>
          <div className="col-sm-8">
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={formInput.firstName}
              onChange={handleInputChange} // Input is now editable
            />
          </div>
        </div>

        {/* Last Name */}
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Last Name:</label>
          <div className="col-sm-8">
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={formInput.lastName}
              onChange={handleInputChange} // Input is now editable
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Email ID:</label>
          <div className="col-sm-8">
            <input
              type="email"
              name="email"
              className="form-control"
              value={formInput.email}
              onChange={handleInputChange} // Input is now editable
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Mobile No:</label>
          <div className="col-sm-8">
            <input
              type="text"
              name="mobileNo"
              className="form-control"
              value={formInput.mobileNo}
              onChange={handleInputChange} // Input is now editable
            />
          </div>
        </div>

        {/* Password Field with Eye Toggle */}
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Password:</label>
          <div className="col-sm-8 d-flex">
            <input
              type={showPassword ? 'text' : 'password'} // Toggle between text and password
              name="password"
              className="form-control"
              value={formInput.password} // Controlled input from state
              onChange={handleInputChange} // Input is now editable
            />
            <button
              type="button"
              className="btn btn-outline-secondary ms-2"
              onClick={togglePasswordVisibility}
              style={{ width: '40px' }} // Reduced width for the eye button
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Buttons for Logout and Save Changes */}
        <div className="text-center d-flex justify-content-center mt-4">
          {/* Save Changes Button */}
          <button
            className="btn btn-primary me-2" // Added margin-end to separate the buttons
            style={{ width: '200px' }} // Reduced width for the Edit button
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>

          {/* Logout Button */}
          <button
            className="btn btn-danger"
            style={{ width: '200px' }} // Reduced width for the Logout button
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
