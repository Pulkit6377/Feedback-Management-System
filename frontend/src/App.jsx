import React, { useState } from 'react'
import {Routes, Route ,Navigate} from 'react-router-dom'
import Navbar from './components/navbar/Navbar.jsx'
import Home from './pages/home/Home.jsx'
import SignIn from './pages/signIn/SignIn.jsx'
import SignUp from './pages/signUp/SignUp.jsx'
import AdminDash from './pages/adminDash/AdminDash.jsx'
import UserDash from './pages/userDash/UserDash.jsx'


const App = () => {
  const token = localStorage.getItem("token");
  let user = null;
  const userData = localStorage.getItem("user");

if (userData && userData !== "undefined") {
  try {
    user = JSON.parse(userData);
  } catch (err) {
    console.error("Invalid user JSON:", err);
    localStorage.removeItem("user"); // cleanup invalid value
  }
}


  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path='/signin' element = {<SignIn/>}/>
        <Route path='/signup' element = {<SignUp/>}/>
        <Route
          path="/dashboard"
            element={
                !token ? (
                  <Navigate to="/" />
                      ) : (
                        <Navigate to={user?.role === "admin" ? "/admin" : "/user"} />
                      )
                  }
            />

<Route path="/admin" element={<AdminDash />} />
<Route path="/user" element={<UserDash />} />

      </Routes>
    </div>
    
  )
}

export default App
