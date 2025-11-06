import React, { useState } from 'react'
import './SignUp.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {

  const url = 'https://feedback-management-system-4f6t.onrender.com'

  const [data,setData] = useState({
    name:"",
    email:"",
    password:"",
    role:"user",
    adminKey:""
  })
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>{
    const name = e.target.name 
    const value = e.target.value 

    setData(data=>({...data,[name]:value}))
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true)
    try{
      const response = await axios.post(url+'/api/user/register',data)
    if(response.data.success){
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user))
      
        setTimeout(() => {
          if (user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/user");
          }
        }, 50);
    }
    else{
      alert(response.data.message)
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
          <select name='role' value={data.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {data.role ==='admin' && (
            <input
            type='password' name='adminKey' placeholder='Enetr Admin Key' value={data.adminKey} onChange={handleChange} required />
          )}
        </div>
        <button type='submit' disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
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
