import React from "react"
import { Link, navigate } from "gatsby"
import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../actions/getToken"

const Login = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.authToken);

  const [registerData, setRegisterData] = useState(
    { 
      name: "",
      email: "",
      password: "",
    }
  )
  const [loginData, setLoginData] = useState(
    { 
      email: "",
      password: "",
    }
  )

  const [resetEmail, setResetEmail] = useState(
    { 
      email: "",
    }
  )

  const userAuth = () => {
    if (authToken !== null && window.location.pathname === "/login") {
      navigate("/")
      return
    }
  }
  userAuth()

  const handleRegister = async () => {
    try {
      await axios({
        method: 'post',
        url: 'http://localhost:3000/api/user/register',
        data: registerData
      })

      alert('Registered!')
    
    } catch (error) {
      alert(JSON.stringify(error.response.data))
    }
}

const handleLogin = async () => {
  axios.post('http://localhost:3000/api/user/login', loginData)
  .then((response) => {

    dispatch(getToken(response.headers["auth-token"]))

    alert('Logged in!')
  }, (error) => {
    alert(JSON.stringify(error.response.data))
  });
}

// const handleMail = async () => {
//   await axios.get("http://localhost:3000/api/mail", resetEmail);
//   console.log(resetEmail)

//   alert('Email sent')
// }

const handleMail = async () => {
  try {
    await axios({
      method: 'post',
      url: 'http://localhost:3000/api/mail',
      data: resetEmail
    })

    alert('Email sent')
    console.log(resetEmail)
  
  } catch (error) {
    alert(JSON.stringify(error.response.data))

    alert('Wrong email')
  }
}

  return (
    <>
    <h1>Login</h1>
    <div>
       <p>Register</p>
        <input placeholder="username" onChange={e => setRegisterData({...registerData, name: e.target.value})}/>
        <input placeholder="email" onChange={e => setRegisterData({...registerData, email: e.target.value})}/>
        <input placeholder="password" onChange={e => setRegisterData({...registerData, password: e.target.value})}/>
        <button onClick={handleRegister}>Register</button> 
    </div>
    <div>
       <p>Login</p>
        <input placeholder="email" onChange={e => setLoginData({...loginData, email: e.target.value})}/>
        <input placeholder="password" onChange={e => setLoginData({...loginData, password: e.target.value})}/>
        <button onClick={handleLogin}>Login</button> 
    </div>
    <div>
       <p>Reset password</p>
        <input placeholder="email" onChange={e => setResetEmail({...resetEmail, email: e.target.value})}/>
        <button onClick={handleMail}>Send password reset email</button> 
    </div>
    <p>usernameChris1@mail.com || passwordChris1</p>
    </>
  )
}

export default Login

 
