import React from "react"
import Layout from "../components/Layout.js"
import { useState, useEffect } from "react"
import axios from "axios"
// import { graphql } from "gatsby"

const Page = () => {
  const [login, setLogin] = useState()
  const [repos, setRepos] = useState([])

  useEffect(() => {
    getData()
    // getDataGraphQL()
  }, [])

  const getData = async () => {
    const login = await axios.get("https://api.github.com/users/chris-cybula")
    const repos = await axios.get(
      "https://api.github.com/users/chris-cybula/repos"
    )

    setLogin(login.data.login)
    setRepos(repos.data)
  }

  // const getDataGraphQL = async () => {
  //   console.log("Chris")
  // }

  return (
    <Layout link={"Index"} location={"/"} title={"Page"}>
      <h1>{login}</h1>
      {repos.map((repo, i) => {
        return (
          <div key={i}>
            <li>{repo.name}</li>
          </div>
        )
      })}
    </Layout>
  )
}

export default Page
