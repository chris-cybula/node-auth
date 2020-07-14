import React from "react"
import App from "../components/App.js"
import Layout from "../components/Layout.js"
import { navigate } from "gatsby"
import { createStore } from "redux"
import allReducers from '../reducers'
import { getToken } from "../actions/getToken";
import { Provider } from "react-redux";

//store
let store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

//console
store.subscribe(() => console.log(store.getState()))

//dispatch
store.dispatch(getToken())


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

