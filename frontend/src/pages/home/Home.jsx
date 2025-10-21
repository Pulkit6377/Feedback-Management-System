import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

const home = () => {
  return (
    <div className='home-container'>
      <div className="home-content">
        <h1>Welcome to Feedback Management System</h1>
        <p>
          A modern platform to collect, manage, and analyze feedback efficiently.
          Whether you are a user or an admin, we have got the perfect dashboard for you.
        </p>
        <div className="home-buttons">
        <Link to='/signup' className='btn-primary' >Get Started</Link>
        <Link to='/signin' className='btn-secondary'  >Sign In</Link>
        </div>
      </div>
    </div>
  )
}

export default home
