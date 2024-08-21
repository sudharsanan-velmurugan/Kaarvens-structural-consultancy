import React,{useState} from 'react';
import './SignIn.css';
import { useDispatch } from 'react-redux';
import { addUser } from '../../Slice/UserSlice';
import { useNavigate,Link } from 'react-router-dom';

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')
  const handleSignin=(e)=>{
    e.preventDefault()
    dispatch(addUser(
      {
        name:name,
        pass:pass,
      }
    ))
    alert('You have successfully registered')
    navigate('/login')
  }
  return (
    <div className='signin-container'>
      <h1>Sign In</h1>
      <form>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" placeholder="First Name" onChange={(e)=>setName(e.target.value)} required />
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
          <input type="password" placeholder="Enter a Password"  required />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm Password" onChange={(e)=>setPass(e.target.value)} required />
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
