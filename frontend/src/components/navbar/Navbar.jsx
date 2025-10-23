import React from 'react'
import './Navbar.css'
import {Link, useNavigate} from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  let user = null;
  const userData = localStorage.getItem("user");

  if (userData && userData !== "undefined") {
  try {
    user = JSON.parse(userData);
  } catch (err) {
    console.error("Invalid user JSON:", err);
    localStorage.removeItem("user");
  }
}

  const handlelogout = () =>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate('/')
  }


  return (
    <nav className='navbar'>
      <h2 className="logo">Feedback Mangement System</h2>
      <div className="nav-links">
        {!token ?(
          <>
          <Link to='/' >Home</Link>
          <Link to='/signin'>Sign In</Link>
          <Link to='/signup'>Sign Up</Link>
          </>
        ):(
        <>
        <span>Hi,</span>
        <button onClick={handlelogout} >LogOut</button>
        </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
