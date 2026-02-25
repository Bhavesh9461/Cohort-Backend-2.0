import React, { useState } from "react";
import "../style/form.scss";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {handleRegister, loading} = useAuth()

  const navigate = useNavigate()

  if(loading){
    return (
      <h1>Loading...</h1>
    )
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    
    handleRegister(username,email,password)
    .then((res)=>{
      console.log(res);
      navigate("/")
    })
  };

  return (
    <main>
      <div className="formContainer">
        <h1>Register</h1>
        <form onSubmit={submitHandler} action="#">
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            type="text"
            placeholder="Enter you username"
            name="username"
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
            placeholder="Enter you email"
            name="email"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            placeholder="Enter your password"
            name="password"
          />
          <button>Register</button>
        </form>
        <p>Already have a account. 
          <Link
          to='/login'
          className='switch'>
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
