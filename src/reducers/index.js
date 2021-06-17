import { combineReducers } from 'redux'


import boards from './boards'
import lists from './lists'
import auth from './auth'
const combReducers = combineReducers({
	boards,
	lists,
	auth
})

export default combReducers