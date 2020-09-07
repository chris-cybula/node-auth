import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { navigate } from "gatsby"
import Layout from "../components/Layout.js"
import Settings from "../components/Settings.js"

const App = () => {
  const [item, setItem] = useState()
  const [listItems, setListItem] = useState([])
  const [userData, setUserData] = useState([])
  const authToken = useSelector((state) => state.authToken);

  useEffect(() => {
    // userAuth()
    getData()
  }, [authToken])

  // const userAuth = () => {
  //   if (authToken === null && window.location.pathname !== "/login") {
  //     navigate("/login")
  //     return
  //   }
  // }
  
  const getData = async () => {

    if(authToken) {
      const userData = await axios.get("http://localhost:3000", {
        headers: {
          'auth-token': authToken.token
          // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjIyZTAwNDRkM2M4ZmU1NTc1YzE5OTYiLCJpYXQiOjE1OTYxMjEzMjN9.wEQF3I4CCuE_hFUEr1ooJgmj-3PiIxO7YIEhdOBaDgI'
        }
      });

      setListItem(userData.data[0].data)
      setUserData(userData.data[0])
      console.log(userData.data[0])

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

  const renderApp = () => {
    if(authToken !== null) {
      return (
        <Layout link={"Settings"} location="/settings" title={"App"}>

          <Settings userData={userData} updateData={updateData}/>

          <h1>App</h1>
          <input onChange={event => setItem(event.target.value)} />
          <button onClick={addItem}>Add</button>
    
          {listItems.map((item, i) => {
            return (
              <div key={i}>
                <li>{item}</li>
                <button onClick={deleteItem}>Delete</button>
              </div>
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
