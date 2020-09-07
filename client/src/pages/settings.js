import React from "react"
import Layout from "../components/Layout.js"
import { useState, useEffect } from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"

const SettingsPage = () => {
  const authToken = useSelector((state) => state.authToken);
  const userDetails = useSelector((state) => state.userDetails);
  

  useEffect(() => {
    console.log(userDetails)
  }, [])

 


  return (
    <Layout link={"Back"} location={"/"} title={"Settings"}>
      <p>Settings</p>
    </Layout>
  )
}

export default SettingsPage
