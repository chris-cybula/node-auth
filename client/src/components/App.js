import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { navigate } from "gatsby"
import Layout from "../components/Layout.js"


const App = () => {
  const [item, setItem] = useState()
  const [listItems, setListItem] = useState([])
  const authToken = useSelector((state) => state.authToken);

  const userAuth = () => {
    if (authToken === null && window.location.pathname !== "/login") {
      navigate("/login")
      return
    }
  }
  
  useEffect(() => {
    userAuth()
    getData()
  }, [])

  const getData = async () => {
    const res = await axios.get("http://localhost:3000")
    const list = res.data.map(a => a.description)

    setListItem(list)
  }

  const addItem = async () => {
    await axios.post("http://localhost:3000", {
      description: item,
    })

    setListItem([...listItems, item])
  }

  const deleteItem = async e => {
    const removedItem = e.target.parentElement.firstChild.innerHTML
    await axios.delete(`http://localhost:3000/${removedItem}`)

    setListItem(listItems.filter(e => e !== removedItem))
  }

  const renderApp = () => {
    if(authToken !== null) {
      return (
        <Layout link={"Page"} location="/page" title={"Index"}>
          <p>token: {authToken.token}</p>
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
