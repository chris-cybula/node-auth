import { createStore } from "redux"
import allReducers from './reducers'

const saveToLocalStorage = (state) =>  {
  try {
    const savedState = JSON.stringify(state)
    localStorage.setItem('state', savedState)
  } catch(e) {
    console.log(e)
  }
}

const loadFromLocalStorage = () => {
  try {
    const savedState = localStorage.getItem('state')
    if (savedState === null) return undefined
    return JSON.parse(savedState)
  } catch(e) {
    console.log(e)
    return undefined
  }
}

const persistState = loadFromLocalStorage()

export let store = createStore(
  allReducers,
  persistState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => saveToLocalStorage(store.getState()))
