import React from "react"
import App from "../components/App.js"
import Layout from "../components/Layout.js"

const Index = () => (
    <Layout link={"Page"} location="/page" title={"Index"}>
        <App />
    </Layout>
  )

export default Index

