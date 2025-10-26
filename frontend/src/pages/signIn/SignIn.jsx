import React, { useContext, useState } from 'react'
import './SignIn.css'
import {useNavigate } from 'react-router-dom';
import axios from 'axios'
import { UserContext } from '../../context/UserContext';

const SignIn = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const {setUser} = useContext(UserContext)
  const navigate = useNavigate();
  const url = "http://localhost:5000";

  const handleChange = (e) =>{
    const name = e.target.name
    const value = e.target.value 

    setData(data=>({...data,[name]:value}))
  }

  const handleSubmit = async(e) => {
      e.preventDefault();
      setLoading(true)
      try{
      const response = await axios.post(url+"/api/user/login",data);
      if(response.data.success){
      const { token, user } = response.data;

        // save token + user
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user)
        

        // navigate according to role
          if (user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/user");
          }
      }
     else{
      alert(response.data.message);
     }       
      }
    catch(error){
      console.log(error);
      alert("Something went wrong!!")
    }
    finally{
      setLoading(false)
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
        <button type='submit' disabled={loading}>{loading ? "Signing In..." : "Sign In"}</button>
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
