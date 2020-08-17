import React from "react"
import App from "../components/App.js"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link, navigate } from "gatsby"
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../actions/getToken"

  const Index = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {

      
      const handleLogin = async () => {

        try {
          axios.defaults.withCredentials = true;
          
          const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/api/user/login',
          })
          
          if(response.headers["auth-token"]) {

            alert('Cookie')
        
            dispatch(getToken(response.headers["auth-token"]))
            
            navigate("/")
          }
          
        
        } catch (error) {
          alert(JSON.stringify(error))
        }
      }

      handleLogin()


    }, [])
  
  

  
  
  
  
    return (
      <App />
    )
  }

  

export default Index

