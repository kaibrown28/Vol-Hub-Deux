import { combineReducers } from 'Redux'
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS
} from './actions'

//authentication reducer
function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false, 
                user: action.creds
            })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true, 
                errorMessage: '' 
            })
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false, 
                isAuthenticated: false,
                errorMessage: action.message
            })
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false
            })
        default:
            return state
    }
}

//quote reducer -  will be replaced
function quotes(state = {}, action){
    switch (action.type) {
        default:
            return state
    }
}

//this combines both reducers
const quotesApp = combineReducers({
    auth, quotes
})

export default quotesApp;