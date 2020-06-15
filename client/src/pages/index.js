import React from "react"
import App from "../components/App.js"
import { Link } from "gatsby"

const Home = () => (
  <>
    <Link to={"/page"}>Page</Link>
    <App />
  </>
)

export default Home
