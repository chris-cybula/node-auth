import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getToken } from "../actions/getToken"
import { Link, navigate } from "gatsby"
import styled from "styled-components"
// import { response } from "express"

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
  console.log('userData', userData)

  const [settingsData, setSettingsData] = useState(
    {   
        oldEmail: "",
        newName: "",
        newEmail: "",
        confirmedEmail: "",
        oldPassword: "",
        newPassword: "",
        confirmedPassword: ""
    }
  )

  const [deleteData, setDeleteData] = useState(
    {   
        nameOrEmail: "",
        verification: "",
    }
  )

  const [nameError, setNameError] = useState()
  
  const [emailError, setEmailError] = useState(
    {   
        oldEmailError: "",
        newEmailError: "",
        confirmedEmailError: "",
    }
  )

  const [passwordError, setPasswordError] = useState(
    {   
        oldPasswordError: "",
        newPasswordError: "",
        confirmedPasswordError: "",
    }
  )

  const [deleteError, setDeleteError] = useState(
    {   
        nameOrEmailError: "",
        verificationError: "",
    }
  )

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
      }
  }

  const changeEmail = async () => {

    let oldEmailMsg = null
    let newEmailMsg = null
    let confirmedEmailMsg = null

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

        setEmailError({
          oldEmailError: null,
          newEmailError: null,
          confirmedEmailError: null
        })
      
      } catch (error) {
        // alert(JSON.stringify(error.response.data))
        console.log(error.response.data)

        if(error.response.data.errors && error.response.data.errors.find(element => element.context.key === "oldEmail")) {
          oldEmailMsg = error.response.data.errors.find(element => element.context.key === "oldEmail").message
        }

        if(error.response.data.errors && error.response.data.errors.find(element => element.context.key === "newEmail")) {
          newEmailMsg = error.response.data.errors.find(element => element.context.key === "newEmail").message
        }

        if(error.response.data.errors && error.response.data.errors.find(element => element.context.key === "confirmedEmail")) {
          confirmedEmailMsg = error.response.data.errors.find(element => element.context.key === "confirmedEmail").message
        }

        if(error.response.data.oldEmail === false) {
          oldEmailMsg = "Wrong old email"
        }

        if(error.response.data.newEmail === true) {
          newEmailMsg = "Email already exists"
        }

        if(error.response.data.confirmedEmail === false) {
          confirmedEmailMsg = "Emails are not the same"
        }

        setEmailError({
          oldEmailError: oldEmailMsg,
          newEmailError: newEmailMsg,
          confirmedEmailError: confirmedEmailMsg
        })

      }
  }

  const changePassword = async () => {

    let oldPasswordMsg = null
    let newPasswordMsg = null
    let confirmedPasswordMsg = null

    try {
        await axios({
          method: 'post',
          url: 'http://localhost:3000/api/settings/password',
          data: userData._id,
        //   headers: {'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjE5NzcwNzNhNGFkNTIzNWQxNmNkZDciLCJpYXQiOjE1OTYwMTk1NTd9.5FGbHMIeSek5DnI4hGzQRO47dyp0k_aJ-eIInvNQgk0'}
            headers: { 'auth-token': authToken.token }
        })
    
        alert('Pass changed')

        updateData('password', settingsData.newPassword)

        setPasswordError({
          oldPasswordError: '',
          newPasswordError: '',
          confirmedPasswordError: ''
        })
      
      } catch (error) {
        // alert(JSON.stringify(error.response.data))
        console.log(error.response.data)

        if(error.response.data.oldPassword === false) {
          oldPasswordMsg = "Wrong old password"
        }

        if(error.response.data.confirmedPassword === false) {
          confirmedPasswordMsg = "Passwords are not the same"
        }

        if(error.response.data.newPassword === false) {
          newPasswordMsg = "Passwords are the same"
        }

        if(error.response.data.errors && error.response.data.errors.find(element => element.context.key === "oldPassword")) {
          oldPasswordMsg = error.response.data.errors.find(element => element.context.key === "oldPassword").message
        }

        if(error.response.data.errors && error.response.data.errors.find(element => element.context.key === "newPassword")) {
          newPasswordMsg = error.response.data.errors.find(element => element.context.key === "newPassword").message
        }

        if(error.response.data.errors && error.response.data.errors.find(element => element.context.key === "confirmedPassword")) {
          confirmedPasswordMsg = error.response.data.errors.find(element => element.context.key === "confirmedPassword").message
        }

        setPasswordError({
          oldPasswordError: oldPasswordMsg,
          newPasswordError: newPasswordMsg,
          confirmedPasswordError: confirmedPasswordMsg
        })
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

  const deleteAccount = async () => {

    let nameOrEmailMsg = null;
    let verificationMsg = null;

    try {
      await axios({
        method: 'post',
        url: 'http://localhost:3000/api/settings/delete',
        data: [userData._id, deleteData],
        headers: { 'auth-token': authToken.token }
      })

      dispatch(getToken(null))
      navigate("/login")
      alert('Account has been deleted')
    
    } catch (error) {

      console.log('error', error.response.data)
      
      if(error.response.data.nameOrEmail !== true) {
        nameOrEmailMsg = "Wrong name or Email"
      }

      if(error.response.data.verification === false) {
        verificationMsg = "Wrong value"
      }
      
      if(error.response.data.errors && error.response.data.errors.find(element => element.context.key === "nameOrEmail")) {
        nameOrEmailMsg = error.response.data.errors.find(element => element.context.key === "nameOrEmail").message
      }

      if(error.response.data.errors && error.response.data.errors.find(element => element.context.key === "verification")) {
        verificationMsg = error.response.data.errors.find(element => element.context.key === "verification").message
      }
    }

    setDeleteError({
      nameOrEmailError: nameOrEmailMsg,
      verificationError: verificationMsg,
    })

  }

  return (
    <>
      <h1>User settings</h1>
          <div>
            <p>Change username - <strong>{userData.name}</strong></p>
              <input placeholder="New username" onChange={e => setSettingsData({...settingsData, newName: e.target.value})}/>
              <ValidationMsg>{nameError}</ValidationMsg>
              <button onClick={changeName}>Change username</button> 
          </div>
          <div>
            <p>Change email - <strong>{userData.email}</strong></p>
              <input placeholder="Old email" onChange={e => setSettingsData({...settingsData, oldEmail: e.target.value})}/>
              <ValidationMsg>{emailError.oldEmailError}</ValidationMsg>
              <input placeholder="New email" onChange={e => setSettingsData({...settingsData, newEmail: e.target.value})}/>
              <ValidationMsg>{emailError.newEmailError}</ValidationMsg>
              <input placeholder="Confirm new email" onChange={e => setSettingsData({...settingsData, confirmedEmail: e.target.value})}/>
              <ValidationMsg>{emailError.confirmedEmailError}</ValidationMsg>
              <button onClick={changeEmail}>Change email</button> 
          </div>
          <div>
            <p>Change password</p>
              <input placeholder="Old password" onChange={e => setSettingsData({...settingsData, oldPassword: e.target.value})}/>
              <ValidationMsg>{passwordError.oldPasswordError}</ValidationMsg>
              <input placeholder="New password" onChange={e => setSettingsData({...settingsData, newPassword: e.target.value})}/>
              <ValidationMsg>{passwordError.newPasswordError}</ValidationMsg>
              <input placeholder="Confirm new password" onChange={e => setSettingsData({...settingsData, confirmedPassword: e.target.value})}/>
              <ValidationMsg>{passwordError.confirmedPasswordError}</ValidationMsg>
              <button onClick={changePassword}>Change password</button> 
          </div>
          <div>
            <p>Delete account</p>
              <input placeholder="Your username or email" onChange={e => setDeleteData({...deleteData, nameOrEmail: e.target.value})}/>
              <ValidationMsg>{deleteError. nameOrEmailError}</ValidationMsg>
              <input placeholder="delete my account" onChange={e => setDeleteData({...deleteData, verification: e.target.value})}/>
              <ValidationMsg>{deleteError.verificationError}</ValidationMsg>
              <button onClick={deleteAccount}>Delete</button> 
          </div>
          <p>Logout</p>
          <button onClick={logout}>Logout</button> 
    </>
  )
}

export default Settings
