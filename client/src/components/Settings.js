import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"

const Settings = ({userData}) => {
  const [newName, setNewName] = useState()


  const changeName = async e => {
    
    console.log(newName)
  }

  return (
    <>
      <h1>User settings</h1>
          <div>
            <p>Change username - {userData.name}</p>
              <input placeholder="New username" onChange={event => setNewName(event.target.value)}/>
              <button onClick={changeName}>Change username</button> 
          </div>
          <div>
            <p>Change email - {userData.email}</p>
              <input placeholder="Old email"/>
              <input placeholder="New email"/>
              <input placeholder="Confirm new email"/>
              <button>Change email</button> 
          </div>
          <div>
            <p>Change password - {userData.password}</p>
              <input placeholder="Old password"/>
              <input placeholder="New password"/>
              <input placeholder="Confirm new password"/>
              <button>Change password</button> 
          </div>
          <p>Logout</p>
          <button>Logout</button> 
    </>
  )
}

export default Settings
