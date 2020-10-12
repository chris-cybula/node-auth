import React from "react"
import App from "../components/App.js"
import { useEffect } from "react"
import axios from "axios"
import { navigate } from "gatsby"
import { useDispatch, useSelector } from "react-redux"
import { getToken } from "../actions/getToken"

const Index = () => {
  const dispatch = useDispatch()
  const authToken = useSelector(state => state.authToken)

  useEffect(() => {
    handleLogin()
  }, [])

  const handleLogin = async () => {
    try {
      axios.defaults.withCredentials = true

      const response = await axios({
        method: "post",
        url: "http://localhost:3000/api/user/cookie",
      })

      if (response.headers["auth-token"]) {
        dispatch(getToken(response.headers["auth-token"]))
      }
    } catch (error) {
      alert(JSON.stringify("Sorry, something went wrong."))
    }
  }

  if (!authToken) {
    navigate("/login")
  }

  return (
    <>
      <App />
    </>
  )
}

export default Index
