import loginReducer from './loginReducer';
import { combineReducers } from "redux"

const allReducers = combineReducers({
    loginReducer,
})

export default allReducers;