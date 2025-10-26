import React, { useEffect, useState,useContext } from 'react'
import {Routes, Route ,Navigate} from 'react-router-dom'
import Navbar from './components/navbar/Navbar.jsx'
import Home from './pages/home/Home.jsx'
import SignIn from './pages/signIn/SignIn.jsx'
import SignUp from './pages/signUp/SignUp.jsx'
import AdminDash from './pages/adminDash/AdminDash.jsx'
import UserDash from './pages/userDash/UserDash.jsx'
import { UserContext } from './context/UserContext.jsx'



const App = () => {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/admin"
          element={token && user?.role === "admin" ? <AdminDash /> : <SignIn />}
        />
        <Route
          path="/user"
          element={token && user?.role === "user" ? <UserDash /> : <Home />}
        />
      </Routes>
    </>
  );
};

export default App;
