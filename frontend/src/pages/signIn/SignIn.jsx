import React, { useState } from 'react'
import './SignIn.css'
import {useNavigate } from 'react-router-dom';
import axios from 'axios'

const SignIn = () => {
  const url = 'http://localhost:5000'

  const [data,setData] = useState({
  email:"",
  password:""
  });

  const navigate = useNavigate();

  const handleChange = (e) =>{
    const name = e.target.name
    const value = e.target.value 

    setData(data=>({...data,[name]:value}))
  }

  const handleSubmit = async(e) => {
      e.preventDefault();
      const response = await axios.post(url+"/api/user/login",data);
      if(response.data.success){
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      window.location.href = '/dashboard';

     }
     else{
      alert(response.data.message);
     }
  }

  return (
    <div className='signin'>
      <form onSubmit={handleSubmit} className="signin-container">
        <div className="signin-title">
        <h2>SignIn</h2>
        <h2 className='pointer' onClick={()=>navigate('/')}>x</h2>
        </div>
        <div className="signin-input">
          <input name='email' type="email" placeholder='Enter your mail' onChange={handleChange} value={data.email} required />
          <input name='password' type="password" placeholder='Enter password' onChange={handleChange} value={data.password} required />
        </div>
        <button type='submit'>Sign In</button>
        <div className="signin-condition">
          <input type="checkbox" required/>
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
        <p>Not Registered? <span onClick={()=>navigate('/signup')} >SignIn here</span></p>
      </form>
    </div>
  )
}

export default SignIn
