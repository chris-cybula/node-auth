import authToken from './authToken';
import userDetails from './userDetails';
import { combineReducers } from "redux"

const allReducers = combineReducers({
    authToken,
    userDetails
})

export default allReducers;