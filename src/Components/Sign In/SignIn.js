import React, { useState } from 'react';
import './SignIn.css';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formInput, setFormInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const [isAgreed, setIsAgreed] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setFormInput((curr) => ({
      ...curr,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  const AddToDB = () => {
    const dataToSend = {
      id: 0, // Assuming the ID is auto-generated on the server
      firstName: formInput.firstName,
      lastName: formInput.lastName,
      mobileNo: formInput.mobile,
      email: formInput.email,
      password: formInput.password,
    };

    fetch("https://localhost:7175/api/UserDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(dataToSend),
    })
      .then((res) => {
        if (res.status === 500) {
          throw new Error("Email already exists. Please use a different email.");
        }
        if (!res.ok) {
          throw new Error(`HTTP Error status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        alert('You have successfully registered');
        navigate('/login');
      })
      .catch((err) => {
        alert(err.message || "Unable to create user");
      });
  };

  const handleConditions = () => {
    const { firstName, email, password, confirmPassword, mobile } = formInput;

    if (!firstName.trim() || !email.trim() || !password.trim()) {
      alert("Please fill in all required fields.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }

    const mobileRegex = /^\d{10}$/;
    if (mobile && !mobileRegex.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return false;
    }

    if (!isAgreed) {
      alert("You must agree to the terms and conditions.");
      return false;
    }

    return true;
  };

  const handleSignin = (e) => {
    e.preventDefault();
    if (!handleConditions()) {
      return;
    }
    AddToDB();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h1 className="text-center mb-4">Sign In</h1>
            <form onSubmit={handleSignin}>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  name="firstName"
                  value={formInput.firstName}
                  onChange={handleInputs}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  name="lastName"
                  value={formInput.lastName}
                  onChange={handleInputs}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={formInput.email}
                  onChange={handleInputs}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Mobile"
                  name="mobile"
                  value={formInput.mobile}
                  onChange={handleInputs}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter a Password"
                  name="password"
                  value={formInput.password}
                  onChange={handleInputs}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formInput.confirmPassword}
                  onChange={handleInputs}
                  required
                />
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="termsCheckbox"
                  checked={isAgreed}
                  onChange={handleCheckboxChange}
                  required
                />
                <label className="form-check-label" htmlFor="termsCheckbox">
                  Agree and Continue
                </label>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
              <div className="mt-3 text-center">
                <p>Already have an account? <Link to="/login">Login here</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
