import React from "react"
import App from "../components/App.js"
import Layout from "../components/Layout.js"
import { navigate } from "gatsby"
import { store } from "../store"
import { Provider } from "react-redux";

const Index = () => {
  const isLoggedIn = true; 

  const userAuth = () => {
    if (!isLoggedIn && window.location.pathname !== "/login") {
      navigate("/login")
      return
    }

    return (
      <Layout link={"Page"} location="/page" title={"Index"}>
        <Provider store={store}>
          <App />
        </Provider>
      </Layout>
    )
  }

  return (
    <>
      {userAuth()}
    </>
  )
}

export default Index

