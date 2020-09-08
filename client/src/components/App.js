import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { navigate } from "gatsby"
import Layout from "../components/Layout.js"
import { Link, useStaticQuery, graphql } from "gatsby"
import { getUserData } from "../actions/getUserData"
import { getToken } from "../actions/getToken"
import styled from "styled-components"

const LogoutButton = styled.span`
  text-decoration: underline;
  cursor: pointer;
  display: block;
  text-align: center;
`
const DeleteButton = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin-left: 20px;
`
const ItemWrapper = styled.div`
  display: flex;
  margin: 20px 0;
`

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`

const App = () => {
  const authToken = useSelector((state) => state.authToken);
  const [item, setItem] = useState()
  const [listItems, setListItem] = useState([])

  const dispatch = useDispatch();


  const [userData, setUserData] = useState([])


  useEffect(() => {
    getData()
  }, [authToken])

  const getData = async () => {

    if(authToken) {
      const userData = await axios.get("http://localhost:3000", {
        headers: {
          'auth-token': authToken.token
        }
      });

      setListItem(userData.data[0].data)
      setUserData(userData.data[0])

      dispatch(getUserData(userData.data[0]))
    }
  }

  

  const addItem = async () => {

    if(authToken) {
      await axios.post("http://localhost:3000", { item: item }, {
        headers: {
          'auth-token': authToken.token
        }
      });
      
      setListItem([...listItems, item])
    }
  }

  const deleteItem = async e => {
    
    const removedItem = e.target.parentElement.firstChild.innerHTML
    
    if(authToken) {
    await axios.delete(`http://localhost:3000/${removedItem}`, {
        headers: {
          'auth-token': authToken.token
        }
      });

      setListItem(listItems.filter(e => e !== removedItem))
    }
  }

  const updateData = (updatedItem, item) => {
    
    setUserData({...userData, [updatedItem]: item})
    
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

  console.log('yoo!', userData)

  const renderApp = () => {
    if(authToken !== null) {
      return (
        <Layout title={"App"}>
          <NavWrapper>
            <Link to="/settings">Settings</Link>
            <LogoutButton onClick={logout}>Logout</LogoutButton>
          </NavWrapper>
          

          <h1 style={{textAlign: 'center'}}>App</h1>
          <input onChange={event => setItem(event.target.value)} />
          <button onClick={addItem}>Add</button>
    
          {listItems.map((item, i) => {
            return (
              <ItemWrapper key={i}>
                <li>{item}</li>
                <DeleteButton onClick={deleteItem}>Delete</DeleteButton>
              </ItemWrapper>
            )
          })}
        </Layout>
    )} 
  }

  return (
    <>
      {renderApp()}
    </>
  )
}

export default App
