import React from "react"
import axios from "axios"
import { useState, useEffect, useRef } from "react"
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

const DeleteButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`

const TextWrapper = styled.div`
  width: calc(100% - 24px);
  overflow-wrap: break-word;
`

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  max-width: 600px;
  margin: 0 auto;
  border-bottom: 1px solid white;
  margin-bottom: 20px;

  &:first-child {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid white;
  }
`

const NavWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
  width: 100%;
`

const InputWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

const DeleteIcon = styled.svg`
  fill: white;
  pointer-events: none;
`

const ValidationMsg = styled.p`
  margin-top: 2px;
  margin-bottom: 3px;
  font-size: 12px;
  color: #E13247;
  height: 20px;
  font-weight: 400;
`

const App = () => {
  const authToken = useSelector((state) => state.authToken);
  const dispatch = useDispatch();
  const itemForm = useRef(null);

  
  const [listItems, setListItem] = useState([])
  // const [item, setItem] = useState()

  const [item, setItem] = useState(
    { 
      item: "",
    }
  )

  const [userData, setUserData] = useState([])
  const [appError, setAppError] = useState()

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

  const addItem = async (e) => {
      e.preventDefault();

      try {
        await axios({
          method: 'post',
          url: 'http://localhost:3000',
          data: item,
          headers: { 'auth-token': authToken.token }
        })

        setListItem([...listItems, item['item']])    
        
        setAppError("")

        setItem({
          item: '', 
        })
  
        itemForm.current.reset();
      
      } catch (error) {
        
        let appErrorMsg = ""

        if(error.response.data.errors) {
          appErrorMsg = error.response.data.errors[0].message
        }

        if(error.response.data.itemExists) {
          appErrorMsg = "Value already exists"
        }

        setAppError(appErrorMsg)
      }
  }

  const deleteItem = async e => {
    
    const removedItem = e.target.parentElement.firstChild.firstChild.innerHTML
    console.log(removedItem)
    
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
  }

  console.log('yoo!', userData)

  const renderApp = () => {
    if(authToken !== null) {
      return (
        <Layout title={"App"}>
          <NavWrapper>
            <Link to="/settings">Settings</Link>
            <LogoutButton onClick={logout} style={{marginLeft: '10px'}}>Sign out</LogoutButton>
          </NavWrapper>
          
          <h1 style={{textAlign: 'center'}}>App</h1>

          <InputWrapper>
            <form ref={itemForm}>
              <input placeholder="Value" onChange={e => setItem({...item, item: e.target.value})} />
              <ValidationMsg>{appError}</ValidationMsg>
              <button onClick={addItem}>Add value</button>
            </form>
          </InputWrapper>

          <div>
            {listItems.map((item, i) => {
              return (
                <ItemWrapper key={i}>
                  <TextWrapper>
                    <span>{item}</span>
                  </TextWrapper>
                  <DeleteButton onClick={deleteItem}>
                    <DeleteIcon height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </DeleteIcon>
                  </DeleteButton>
                </ItemWrapper>
              )
            })}
          </div>
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
