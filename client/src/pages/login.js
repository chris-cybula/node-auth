import React from "react"
import { Link } from "gatsby"
import { useState } from "react"
import axios from "axios"

const Login = () => {
  const [registerData, setRegisterData] = useState(
    { 
      name: "",
      email: "",
      password: "",
    }
  )

  // const handleRegister = async () => {
  //   console.log(JSON.stringify(registerData))

  //   await axios.post('http://localhost:3000/api/user/register', data: registerData)
  // }

  const handleRegister = async () => {
  await axios({
    method: 'post',
    url: 'http://localhost:3000/api/user/register',
    data: registerData
  })

  alert('Register')
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
        <input placeholder="username or email address"/>
        <input placeholder="password"/>
        <button>Login</button> 
        <Link to="/">Forgot password?</Link>
    </div>
    </>
  )
}

export default Login

 
