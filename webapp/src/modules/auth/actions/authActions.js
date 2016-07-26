'use strict'

import * as AuthApi    from '../api/AuthApi'
import { hashHistory } from 'react-router'


export const LOGIN_REQUEST  = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS  = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE  = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'


const requestLogin = credentials => ({
    type: LOGIN_REQUEST,
    credentials,
})

const loginSuccess = token => ({
    type: LOGIN_SUCCESS,
    token,
})

const loginFailure = message => ({
    type: LOGIN_FAILURE,
    message,
})



/**
 * This action creator is meant to be used with reduxForm() instead of connect(),
 * that's why the first argument is the data to submit,
 * we don't use the `actionName => dispatch => {}` form.
 *
 * @param {Object}   topic    - The use credentials
 * @param {function} dispatch - The redux dispatch function
 * @returns {Promise.<*>}
 */
export const login = (credentials, dispatch) => {
    dispatch(requestLogin(credentials))

    return AuthApi.login(credentials)
        .then(token => {
            dispatch(loginSuccess(token))
            localStorage.setItem('token', token)
            hashHistory.push('/')
        })
        .catch(error => {
            dispatch(loginFailure(error))

            return Promise.reject(error)
        })
}

const requestLogout = () => ({
    type: LOGOUT_REQUEST,
})

const receiveLogout = () => ({
    type: LOGOUT_SUCCESS,
})

export function logout() {
    return dispatch => {
        dispatch(requestLogout())
        localStorage.removeItem('token')
        dispatch(receiveLogout())
        hashHistory.push('/login')
    }
}