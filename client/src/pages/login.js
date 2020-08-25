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
      nameOrEmail: "",
      password: "",
    }
  )

  const [resetEmail, setResetEmail] = useState(
    { 
      email: "",
    }
  )

  const [isLogged, setIsLogged] = useState()


  useEffect(() => {

    handleIsLogged()
  
  }, [])
  
  const handleIsLogged = async () => {
  
    try {
      axios.defaults.withCredentials = true;
      
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/user/cookie',
      })
      
      if(response.headers["auth-token"]) {
        navigate("/")
        setIsLogged(true)
      } else {
        setIsLogged(false)
      }
      
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

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

  try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3000/api/user/login',
      data: loginData
    })

    alert('Logged in!')

    dispatch(getToken(response.headers["auth-token"]))
    
    navigate("/")
  
  } catch (error) {
    alert(JSON.stringify(error))
  }
}

const handleMail = async () => {
  try {
    await axios({
      method: 'post',
      url: 'http://localhost:3000/api/mail',
      data: resetEmail
    })

    alert('Email sent')
  
  } catch (error) {
    alert(JSON.stringify(error.response.data))
  }
}

  if( isLogged === false) {

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
        <input placeholder="username or email" onChange={e => setLoginData({...loginData, nameOrEmail: e.target.value})}/>
        <input placeholder="password" onChange={e => setLoginData({...loginData, password: e.target.value})}/>
        <button onClick={handleLogin}>Login</button> 
    </div>
    <div>
       <p>Reset password</p>
        <input placeholder="email" onChange={e => setResetEmail({...resetEmail, email: e.target.value})}/>
        <button onClick={handleMail}>Send password reset email</button> 
    </div>
    <p>usernameChris1@mail.com || 1Z2EqZEg53</p>
    </>
  )
  } else {
    return (
      <>
      </>
    )
  }
}


export default Login

 
