import React,{useState} from 'react';
import './SignIn.css';
import { useDispatch } from 'react-redux';
import { addUser, setLoggedInUser } from '../../Slice/UserSlice';
import { useNavigate,Link, json } from 'react-router-dom';

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formInput, setFormInput] = useState({
    firstName:'',
    lastName:'',
    email:'',
    mobile:'',
    password:'',

  })
  const handleInputs=(e)=>{
    const {name,value} = e.target
    setFormInput((curr)=>({
      ...curr,
      [name]:value
    }))
  }
  const AddToDB = () => {
    const dataToSend = {
      id: 0, // Since the ID is often auto-generated, you can keep this or omit if unnecessary
      firstName: formInput.firstName,
      lastName: formInput.lastName,
      mobileNo: formInput.mobile, // API expects 'mobileNo' field, not 'mobile'
      email: formInput.email,
      password:formInput.password
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
        if (!res.ok) {
          throw new Error(`HTTP Error status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("User created successfully:", data);
      })
      .catch((err) => {
        console.error("Error creating user:", err);
        alert("Unable to create user");
      });
  };
  

  const handleConditions = () => {
    const { firstName, lastName, email, mobile, password } = formInput;
  
    // Check if required fields are empty
    if (!firstName.trim() || !email.trim() || !password.trim()) {
      alert("Please fill in all the required fields.");
      return false;
    }
  
    // Check if email is valid (simple regex for email validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
  
    // Check if password is at least 6 characters
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
    }
  
    // Check if passwords match
    if (password !== formInput.password) {
      alert("Passwords do not match.");
      return false;
    }
  
    // Check if mobile number is 10 digits (you can adjust for your region)
    const mobileRegex = /^\d{10}$/;
    if (mobile && !mobileRegex.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return false;
    }
  
    return true; // If all conditions pass
  };
  
  const handleSignin=(e)=>{
    e.preventDefault()
    if(!handleConditions()){
      return 
    }    
    AddToDB()
    alert('You have successfully registered')
    navigate('/login')
  }
  return (
    <div className='signin-container'>
      <h1>Sign In</h1>
      <form>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" placeholder="First Name" name='firstName' value={formInput.firstName} onChange={handleInputs} required />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" name='lastName' value={formInput.lastName} onChange={handleInputs} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Email" name='email' value={formInput.email} onChange={handleInputs} required />
        </div>
        <div className="form-group">
          <label>Mobile Number</label>
          <input type="tel" placeholder="Mobile" name='mobile' value={formInput.mobile} onChange={handleInputs} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name='pass' placeholder="Enter a Password"  required />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm Password" name='password' value={formInput.password} onChange={handleInputs} required />
        </div>
        <div className="signup-checkbox">
          <input type="checkbox" required />
          <label>Agree and Continue</label>
        </div>
        <button type="submit" onClick={handleSignin} >Submit</button>
        <div className="login-link">
          <p>Already have an account? <Link to='/login' >Login here</Link></p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
