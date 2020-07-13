import React from "react"
import App from "../components/App.js"
import Layout from "../components/Layout.js"
import { navigate } from "gatsby"

const isLoggedIn = false; 

const Home = () => {

  const userAuth = () => {
    if (!isLoggedIn && window.location.pathname !== "/login") {
      navigate("/login")
      return
    }

    return (
      <Layout link={"Page"} location="/page" title={"Index"}>
        <App />
      </Layout>
    )
  }

  return (
    <>
        {userAuth()}
    </>
  )
}

export default Home

