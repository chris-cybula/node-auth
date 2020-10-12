import { createStore } from "redux"
import allReducers from './reducers'

const saveToSessionStorage = (state) =>  {
  try {
    const savedState = JSON.stringify(state)
    sessionStorage.setItem('state', savedState)
  } catch(e) {
    alert(JSON.stringify("Sorry, something went wrong."))
  }
}

const loadFromSessionStorage = () => {
  try {
    const savedState = sessionStorage.getItem('state')
    if (savedState === null) return undefined
    return JSON.parse(savedState)
  } catch(e) {
    alert(JSON.stringify("Sorry, something went wrong."))
    return undefined
  }
}

const persistState = loadFromSessionStorage()

export let store = createStore(
  allReducers,
  persistState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => saveToSessionStorage(store.getState()))
