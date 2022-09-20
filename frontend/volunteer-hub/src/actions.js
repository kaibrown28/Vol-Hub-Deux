//this file handles async calls for login requests

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true, 
        isAuthenticated: false,
        creds
    }
};

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    }
};

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
};

//login user function
export function loginUser(creds) {

    let config = {
      method: 'POST',
      headers: { 'Content-Type':'application/x-www-form-urlencoded' },
      body: `username=${creds.username}&password=${creds.password}`
    }
  
    return dispatch => {
      dispatch(requestLogin(creds))
  
      return fetch('http://localhost:3001/sessions/create', config)
        .then(response =>
          response.json().then(user => ({ user, response }))
              ).then(({ user, response }) =>  {
          if (!response.ok) {
            dispatch(loginError(user.message))
            return Promise.reject(user)
          } else {
            localStorage.setItem('id_token', user.id_token)
            localStorage.setItem('id_token', user.access_token)
            dispatch(receiveLogin(user))
          }
        }).catch(err => console.log("Error: ", err))
    }
  }

  //logout functions

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

  function requestLogout(){
    return{
        type: LOGOUT_REQUEST,
        isFetching: false,
        isAuthenticated: false
    }
  };

  function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS, 
        isFetching: false,
        isAuthenticated: false
    }
  };

export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout())
        localStorage.removeItem('id_token')
        localStorage.removeItem('access_token')
        dispatch(receiveLogout())
    }
}