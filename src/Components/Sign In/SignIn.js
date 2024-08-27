import React,{useState} from 'react';
import './SignIn.css';
import { useDispatch } from 'react-redux';
import { addUser, setLoggedInUser } from '../../Slice/UserSlice';
import { useNavigate,Link } from 'react-router-dom';

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
  const handleSignin=(e)=>{
    const {firstName,lastName,email,mobile,password} =formInput
    e.preventDefault()
    dispatch(addUser(
      {
        firstName:firstName,
        lastName:lastName,
        email:email,
        mobile:mobile,
        password:password,
      }
    ))
    dispatch(setLoggedInUser(email))
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
