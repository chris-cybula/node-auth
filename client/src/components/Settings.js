import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getToken } from "../actions/getToken"
import { Link, navigate } from "gatsby"
import styled from "styled-components"

const ValidationMsg = styled.p`
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 14px;
  color: red;
  height: 17px;
`

const Settings = ({userData, updateData}) => {
  const dispatch = useDispatch();
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

  const [nameError, setNameError] = useState()

  const changeName = async () => {

    let nameErrorMsg = '';

    try {
        await axios({
          method: 'post',
          url: 'http://localhost:3000/api/settings/name',
          data: [userData._id, settingsData],
        //   headers: {'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjIyZTAwNDRkM2M4ZmU1NTc1YzE5OTYiLCJpYXQiOjE1OTYxMjEzMjN9.wEQF3I4CCuE_hFUEr1ooJgmj-3PiIxO7YIEhdOBaDgI'}
            headers: { 'auth-token': authToken.token }
        })

        setNameError("")
    
        alert('Name changed')

        updateData('name', settingsData.newName)
      
      } catch (error) {

        if(error.response.data.errors) {
          nameErrorMsg = error.response.data.errors[0].message
        }
    
        if(error.response.data.errors === null && error.response.data.name === true) {
          nameErrorMsg = 'Name already exist' 
        }

        setNameError(nameErrorMsg)
        
        console.log(error.response.data)
      }
  }

  const changeEmail = async () => {

    try {
        await axios({
          method: 'post',
          url: 'http://localhost:3000/api/settings/email',
          data: [userData._id, settingsData],
        //   headers: {'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjE5NzcwNzNhNGFkNTIzNWQxNmNkZDciLCJpYXQiOjE1OTYwMTk1NTd9.5FGbHMIeSek5DnI4hGzQRO47dyp0k_aJ-eIInvNQgk0'}
            headers: { 'auth-token': authToken.token }
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

  const logout = async () => {

    try {
      await axios({
        method: 'post',
        url: 'http://localhost:3000/api/user/clear-cookie',
      })
      
     console.log('cookie removed')
    
    } catch (error) {
      alert(JSON.stringify(error))
    }

    dispatch(getToken(null))
    navigate("/login")
    alert('logout')
  }

  return (
    <>
      <h1>User settings</h1>
          <div>
            <p>Change username - {userData.name}</p>
              <input placeholder="New username" onChange={e => setSettingsData({...settingsData, newName: e.target.value})}/>
              <ValidationMsg>{nameError}</ValidationMsg>
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
          <button onClick={logout}>Logout</button> 
    </>
  )
}

export default Settings
