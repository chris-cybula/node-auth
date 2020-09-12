import React from "react"
import { Link, navigate } from "gatsby"
import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../actions/getToken"
import styled from "styled-components"

const ValidationMsg = styled.p`
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 14px;
  color: #E13247;
  height: 20px;
  font-weight: 400;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

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

  const [registerErrors, setRegisterErrors] = useState(
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

  const [loginErrors, setLoginErrors] = useState(
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

  const [resetEmailError, setResetEmailError] = useState(
    { 
      emailError: ""
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

      setRegisterErrors({
        name: '', 
        email: '', 
        password: ''
      })
    
    } catch (error) {

      let nameMsg = '';
      let emailMsg = '';
      let passwordMsg = '';
      
      if(error.response.data.errors && error.response.data.errors.find(element => element.context.key === "name")) {
        nameMsg = error.response.data.errors.find(element => element.context.key === "name").message
      }

      if(error.response.data.errors && error.response.data.errors.find(element => element.context.key === "email")) {
        emailMsg = error.response.data.errors.find(element => element.context.key === "email").message
      }

      if(error.response.data.errors && error.response.data.errors.find(element => element.context.key === "password")) {
        passwordMsg = error.response.data.errors.find(element => element.context.key === "password").message
      }

      if(error.response.data.emailExist && error.response.data.emailExist === true) {
        emailMsg = 'Email already exist'
      }

      if(error.response.data.nameExist && error.response.data.nameExist === true) {
        nameMsg = 'Name already exist'
      }

      setRegisterErrors({
        name: nameMsg, 
        email: emailMsg, 
        password: passwordMsg
      })
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
      let nameOrEmailMsg = '';
      let passwordMsg = '';

      if(error.response.data.nameOrEmail === false) {
        nameOrEmailMsg = 'Wrong name or email'
      }

      if(error.response.data.password === false) {
        passwordMsg = 'Wrong password'
      }
      
      if(error.response.data.errors && error.response.data.errors.find(element => element.context.key === "nameOrEmail")) {
        nameOrEmailMsg = error.response.data.errors.find(element => element.context.key === "nameOrEmail").message
      }

      if(error.response.data.errors && error.response.data.errors.find(element => element.context.key === "password")) {
        passwordMsg = error.response.data.errors.find(element => element.context.key === "password").message
      }

      setLoginErrors({
        nameOrEmail: nameOrEmailMsg ,
        password: passwordMsg,
      })
  }
}

const handleMail = async () => {
  try {
    await axios({
      method: 'post',
      url: 'http://localhost:3000/api/mail',
      data: resetEmail
    })

    setResetEmailError({
      emailError: ''
    })

    alert('Email sent')
  
  } catch (error) {

    let emailErrorMsg = '';

    if(error.response.data.errors) {
      emailErrorMsg = error.response.data.errors[0].message
    }

    if(error.response.data.errors === null && error.response.data.emailExist === false) {
      emailErrorMsg = 'Email doesn\'t exist' 
    }

    setResetEmailError({
      emailError: emailErrorMsg ,
    })
  }
}

  if( isLogged === false) {

  return (
    <Container>
      <h1>Login</h1>
      <div>
      <p>Register</p>
      <div>
        <input placeholder="Username" onChange={e => setRegisterData({...registerData, name: e.target.value})}/>
        <ValidationMsg>{registerErrors.name}</ValidationMsg>
      </div>
      <div>
        <input placeholder="Email" onChange={e => setRegisterData({...registerData, email: e.target.value})}/>
        <ValidationMsg>{registerErrors.email}</ValidationMsg>
      </div>
      <div>
        <input placeholder="Password" onChange={e => setRegisterData({...registerData, password: e.target.value})}/>
        <ValidationMsg>{registerErrors.password}</ValidationMsg>
      </div>
          <button onClick={handleRegister}>Register</button> 
      </div>
      <div>
        <p>Login</p>
          <input placeholder="username or email" onChange={e => setLoginData({...loginData, nameOrEmail: e.target.value})}/>
          <ValidationMsg>{loginErrors.nameOrEmail}</ValidationMsg>
          <input placeholder="password" onChange={e => setLoginData({...loginData, password: e.target.value})}/>
          <ValidationMsg>{loginErrors.password}</ValidationMsg>
          <button onClick={handleLogin}>Login</button> 
      </div>
      <div>
        <p>Reset password</p>
          <input placeholder="email" onChange={e => setResetEmail({...resetEmail, email: e.target.value})}/>
          <ValidationMsg>{resetEmailError.emailError}</ValidationMsg>
          <button onClick={handleMail}>Send email</button> 
      </div>
    </Container>
  )
  } else {
    return (
      <>
      </>
    )
  }
}


export default Login

 
