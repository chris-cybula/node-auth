import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";


const Settings = ({userData, updateData}) => {
  const authToken = useSelector((state) => state.authToken);

  const [settingsData, setSettingsData] = useState(
    {   
        newName: "",
        oldEmail: "",
        newEmail: "",
        confirmedEmail: "",
        oldPassword: "",
        newPassword: "",
        confirmedPassword: ""
    }
  )

  const changeName = async () => {

    try {
        await axios({
          method: 'post',
          url: 'http://localhost:3000/api/settings/name',
          data: [userData._id, settingsData],
          headers: {'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjIyZTAwNDRkM2M4ZmU1NTc1YzE5OTYiLCJpYXQiOjE1OTYxMjEzMjN9.wEQF3I4CCuE_hFUEr1ooJgmj-3PiIxO7YIEhdOBaDgI'}
            // headers: { 'auth-token': authToken.token }
        })
    
        alert('Name changed')

        updateData('name', settingsData.newName)
      
      } catch (error) {
        alert(JSON.stringify(error.response.data))
      }
  }

  const changeEmail = async () => {

    try {
        await axios({
          method: 'post',
          url: 'http://localhost:3000/api/settings/email',
          data: [userData._id, settingsData],
          headers: {'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjE5NzcwNzNhNGFkNTIzNWQxNmNkZDciLCJpYXQiOjE1OTYwMTk1NTd9.5FGbHMIeSek5DnI4hGzQRO47dyp0k_aJ-eIInvNQgk0'}
            // headers: { 'auth-token': authToken.token }
        })
    
        alert('Email changed')

        updateData('email', settingsData.newEmail)
      
      } catch (error) {
        alert(JSON.stringify(error.response.data))
      }
  }

  const changePassword = async () => {

    try {
        await axios({
          method: 'post',
          url: 'http://localhost:3000/api/settings/password',
          data: [userData._id, settingsData],
        //   headers: {'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjE5NzcwNzNhNGFkNTIzNWQxNmNkZDciLCJpYXQiOjE1OTYwMTk1NTd9.5FGbHMIeSek5DnI4hGzQRO47dyp0k_aJ-eIInvNQgk0'}
            headers: { 'auth-token': authToken.token }
        })
    
        alert('Pass changed')

        updateData('password', settingsData.newPassword)
      
      } catch (error) {
        alert(JSON.stringify(error.response.data))
      }
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
              <input placeholder="Old email" onChange={e => setSettingsData({...settingsData, oldEmail: e.target.value})}/>
              <input placeholder="New email" onChange={e => setSettingsData({...settingsData, newEmail: e.target.value})}/>
              <input placeholder="Confirm new email" onChange={e => setSettingsData({...settingsData, confirmedEmail: e.target.value})}/>
              <button onClick={changeEmail}>Change email</button> 
          </div>
          <div>
            <p>Change password - {userData.password}</p>
              <input placeholder="Old password" onChange={e => setSettingsData({...settingsData, oldPassword: e.target.value})}/>
              <input placeholder="New password" onChange={e => setSettingsData({...settingsData, newPassword: e.target.value})}/>
              <input placeholder="Confirm new password" onChange={e => setSettingsData({...settingsData, confirmedPassword: e.target.value})}/>
              <button onClick={changePassword}>Change password</button> 
          </div>
          <p>Logout</p>
          <button>Logout</button> 
    </>
  )
}

export default Settings
