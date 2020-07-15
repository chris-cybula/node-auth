import React from "react"
import App from "../components/App.js"
import Layout from "../components/Layout.js"
import { store } from "../store"
import { Provider } from "react-redux";

const Index = () => (
    <Layout link={"Page"} location="/page" title={"Index"}>
      <Provider store={store}>
        <App />
      </Provider>
    </Layout>
  )

export default Index

