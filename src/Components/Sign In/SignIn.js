import React from 'react';
import './SignIn.css';

const SignIn = () => {
  return (
    <div className='signin-container'>
      <h1>Sign In</h1>
      <form>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" placeholder="First Name" required />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Email" required />
        </div>
        <div className="form-group">
          <label>Mobile Number</label>
          <input type="tel" placeholder="Mobile" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter a Password" required />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm Password" required />
        </div>
        <div className="signup-checkbox">
          <input type="checkbox" required />
          <label>Agree and Continue</label>
        </div>
        <button type="submit">Submit</button>
        <div className="login-link">
          <p>Already have an account? <a href="#">Login here</a></p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
