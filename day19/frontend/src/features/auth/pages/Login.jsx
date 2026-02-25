import React, { useState } from 'react'
import "../style/form.scss"
import axios from "axios"
import {useAuth} from '../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const {handleLogin, loading} = useAuth()

  const navigate = useNavigate()

  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }

  const submitHandler = async (e)=>{
    e.preventDefault()
    
     handleLogin(username,password)
     .then((res)=>{
      console.log(res);
      navigate("/")
     })
    ;
    
  }
    
  return (
    <main>
      <div className='formContainer'>
        <h1>Login</h1>
        <form
        onSubmit={submitHandler}
        action="#">
          <input
          onChange={(e)=>{
            setUsername(e.target.value)
          }} 
          value={username}
          type="text" 
          placeholder='Enter you username' 
          name='username' 
          />
          <input
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
          value={password} 
          type='password' 
          placeholder='Enter your password' 
          name='password' 
          />
          <button>Login</button>
        </form>
        <p>Do you have account? 
          <Link
          to='/register'
          className='switch'>
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  )
}

export default Login