import React from "react"
import axios from "axios"

import { useState, useEffect } from "react"

const App = () => {
  const [item, setItem] = useState()
  const [listItems, setListItem] = useState([])

  useEffect(() => {
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

  return (
    <div>
      <input onChange={event => setItem(event.target.value)} />
      <button onClick={addItem}>Add</button>

      {listItems.map((item, i) => {
        return (
          <div key={i} className="itemWrapper">
            <li>{item}</li>
            <button onClick={deleteItem}>Delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default App
