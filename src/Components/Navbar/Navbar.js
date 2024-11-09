import React from "react";
import { Link } from "react-router-dom";
import "../Navbar/Navbar.css";
import { useSelector } from "react-redux";
import {
  FaHome,
  FaEdit,
  FaUsers,
  FaUser,
  FaThList,
  FaTasks,
  FaRupeeSign,
} from "react-icons/fa";

const Navbar = () => {
  // Get user login states from Redux
  const isUserLogin = useSelector((state) => state.loginInfo.isUserLogin);
  const isAdminLogin = useSelector((state) => state.loginInfo.isAdminLogin);

  return (
    <div className="Nav-Container">
      <ul>
        {/* Components visible only to Admin */}
        {isAdminLogin && (
          <>
            <li>
              <Link className="nav-elements" to="/users">
                <FaUsers />
              </Link>
            </li>
            <li>
              <Link className="nav-elements" to="/finance">
                <FaRupeeSign />
              </Link>
            </li>
          </>
        )}
        {/* Components visible only to User */}
        {isUserLogin && (
          <>
            <li>
              <Link className="nav-elements" to="/tasks">
                <FaTasks />
              </Link>
            </li>
          </>
        )}
        {/* Components visible to any logged-in user (Admin or User) */}
        {(isUserLogin || isAdminLogin) && (
          <>
            <li>
              <Link className="nav-elements" to="/projects">
                <FaThList />
              </Link>
            </li>
            <li>
              <Link className="nav-elements" to="/profile">
                <FaUser />
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
