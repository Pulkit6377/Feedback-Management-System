import React, { useState } from 'react'
import './SignUp.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {

  const url = 'http://localhost:5000'

  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const navigate = useNavigate();

  const handleChange = (e) =>{
    const name = e.target.name 
    const value = e.target.value 

    setData(data=>({...data,[name]:value}))
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const response = await axios.post(url+'/api/user/register',data)
    if(response.data.success){
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      window.location.href = '/dashboard';
    }
    else{
      alert(response.data.message)
    }
  }

  return (
    <div className="signup">
      <form onSubmit={handleSubmit} className='signup-container'>
        <div className="signup-title">
          <h2>SignUp</h2>
          <h2 className='pointer' onClick={()=>navigate('/')} >x</h2>
        </div>
        <div className="signup-input">
          <input type="name" name='name' value={data.name} onChange={handleChange} placeholder='Enter your name ' required/>
          <input type="email" name='email' value={data.email} onChange={handleChange} placeholder='Enter your mail' required/>
          <input type="password" name='password' value={data.password} onChange={handleChange} placeholder='Enter password' required/>
        </div>
        <button type='submit'>Sign Up</button>
        <div className="signup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to terms of use & privacy policy</p>
        </div>
        <p>Already SignUp? <span onClick={()=>navigate('/signin')} >Click here</span> </p>
      </form>
    </div>
  )
}

export default SignUp
