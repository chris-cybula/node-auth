import React from "react"
import Layout from "../components/Layout.js"
import { useState, useEffect } from "react"

const Page = () => {
  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    //   const res = await axios.get("http://localhost:3000")
    //   const list = res.data.map(a => a.description)
    //   setListItem(list)

    console.log("Chris")
  }

  return (
    <Layout link={"Index"} location={"/"} title={"Page"}>
      <h1>Page</h1>
    </Layout>
  )
}

export default Page
