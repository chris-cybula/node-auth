import React from "react"
import { Link } from "gatsby"
import { useState } from "react"


const Login = () => {
  const [registerData, setRegisterData] = useState(
    { 
      "name": "",
      "email": "",
      "password": "",
    }
  )

  console.log(registerData)

  return (
    <>
    <h1>Login</h1>
    <div>
       <p>Register</p>
        <input placeholder="username" onChange={e => setRegisterData(e.target.value)}/>
        <input placeholder="email"/>
        <input placeholder="password"/>
        <button>Register</button> 
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


function useInput({ type /*...*/ }) {
  const [value, setValue] = useState("");
  const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
  return [value, input];
}