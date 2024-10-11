import React, { useState, useEffect } from "react";
import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setAdminLogin, setUserLogin } from "../../Slice/LoginSlice";
import { setLoggedInUser } from "../../Slice/UserSlice";
const Login = () => {
  const users = useSelector((state) => state.userInfo.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState([]);

  const GetUserDeteils = () => {
    fetch("https://localhost:7175/api/UserDetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((data) => {
        setUserDetails(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("Unable to get data: " + error.message);
      });
  };
  useEffect(() => {
    GetUserDeteils();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const adminFound = userDetails.find((admin)=>admin.email === "admin@kaarvens.com" && admin.password ==="admin@123" )
    if ((email === "admin@kaarvens.com") & (password === "admin@123")) {
      alert("you logged in as a admin");
      dispatch(setAdminLogin());
      dispatch(setLoggedInUser(adminFound))
      navigate("/users");
    } 
    else {
      const userFound = userDetails.find(
        (user) => user.email === email && user.password === password
      );
      if (userFound) {
        alert("You are logged in as a user");
        dispatch(setUserLogin());
        dispatch(setLoggedInUser(userFound));
        navigate("/projects");
      } else {
        alert("invalid login id or pass");
      }
    }
  };
  return (
    <div className="login-page-container">
      <h1>Login Page</h1>
      <form>
        <div className="user-name-container">
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="user-password-container">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="login-checkbox">
          <label1>
            <input type="checkbox" /> Remember me
          </label1>
          <Link to="/forgot">forget password</Link>
        </div>
        <button type="submit" onClick={handleLogin}>
          Log In
        </button>
        <div className="login-register-link">
          <p>
            Don't have any account? <Link to="/signin">Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
