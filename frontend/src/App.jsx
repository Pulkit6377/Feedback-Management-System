import React from 'react'
import {Routes, Route ,Navigate} from 'react-router-dom'
import Navbar from './components/navbar/Navbar.jsx'
import Home from './pages/home/Home.jsx'
import SignIn from './pages/signIn/SignIn.jsx'
import SignUp from './pages/signUp/SignUp.jsx'
import AdminDash from './pages/adminDash/AdminDash.jsx'
import UserDash from './pages/userDash/UserDash.jsx'


const App = () => {
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(localStorage.getItem("user")) : null ; // {name,role,email}
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path='/signin' element = {<SignIn/>}/>
        <Route path='/signup' element = {<SignUp/>}/>
        <Route 
            path='/dashboard'
             element = {
               !token ? (
                <Navigate to="/signup" />
               ): user?.role ==="admin" ? (
                <AdminDash />
               ): (
                <UserDash />
               )
             }
          />
      </Routes>
    </div>
    
  )
}

export default App
