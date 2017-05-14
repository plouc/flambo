import * as api from '../api'
import history  from '../../../core/history'


export const LOGIN_REQUEST  = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS  = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE  = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

const requestLogin = credentials => ({ type: LOGIN_REQUEST, credentials })
const loginSuccess = token       => ({ type: LOGIN_SUCCESS, token       })
const loginFailure = message     => ({ type: LOGIN_FAILURE, message     })

export const login = credentials => dispatch => {
    dispatch(requestLogin(credentials))

    return api.login(credentials)
        .then(({ token }) => {
            dispatch(loginSuccess(token))
            localStorage.setItem('token', token)
            history.push('/')
        })
        .catch(error => {
            dispatch(loginFailure(error))

            return Promise.reject(error)
        })
}

const requestLogout = () => ({ type: LOGOUT_REQUEST })
const receiveLogout = () => ({ type: LOGOUT_SUCCESS })

export function logout() {
    return dispatch => {
        dispatch(requestLogout())
        localStorage.removeItem('token')
        dispatch(receiveLogout())
        history.push('/login')
    }
}