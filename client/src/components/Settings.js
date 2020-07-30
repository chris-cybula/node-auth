import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";


const Settings = ({userData, updateData}) => {
  const authToken = useSelector((state) => state.authToken);

  const [settingsData, setSettingsData] = useState(
    {   
        newName: "",
    }
  )

  const changeName = async e => {

    try {
        await axios({
          method: 'post',
          url: 'http://localhost:3000/api/settings/name',
          data: [userData._id, settingsData],
          headers: {'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjE5NzcwNzNhNGFkNTIzNWQxNmNkZDciLCJpYXQiOjE1OTYwMTk1NTd9.5FGbHMIeSek5DnI4hGzQRO47dyp0k_aJ-eIInvNQgk0'}
            // headers: { 'auth-token': authToken.token }
        })
    
        alert('Name changed')

        updateData('name', settingsData.newName)
      
      } catch (error) {
        alert(JSON.stringify(error.response.data))
      }

      console.log(settingsData)
  }

  return (
    <>
      <h1>User settings</h1>
          <div>
            <p>Change username - {userData.name}</p>
              <input placeholder="New username" onChange={e => setSettingsData({...settingsData, newName: e.target.value})}/>
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
