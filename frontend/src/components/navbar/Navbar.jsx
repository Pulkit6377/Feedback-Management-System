import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  useEffect(() => {
    if (userData && userData !== "undefined") {
      try {
        setUser(JSON.parse(userData)); // ✅ parse string to object
      } catch (err) {
        console.error("Invalid user JSON:", err);
        localStorage.removeItem("user");
      }
    }
  }, []); // run once on mount

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // ✅ clear state
    navigate('/');
  };

  return (
    <nav className='navbar'>
      <h2 className="logo">Feedback Management System</h2>
      <div className="nav-links">
        {!token ? (
          <>
            <Link to='/'>Home</Link>
            <Link to='/signin'>Sign In</Link>
            <Link to='/signup'>Sign Up</Link>
          </>
        ) : (
          <>
            <span>Hi, {user?.name}</span> {/* ✅ use parsed user */}
            <button onClick={handleLogout}>LogOut</button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar;
