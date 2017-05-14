import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
} from '../actions'


export default function auth(state = {
    isFetching:      false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    errorMessage:    '',
    token:           localStorage.getItem('token'),
}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isFetching:      true,
                isAuthenticated: false,
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                token:           action.token,
                isFetching:      false,
                isAuthenticated: true,
                errorMessage:    '',
            }

        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching:      false,
                isAuthenticated: false,
                errorMessage:    action.message,
            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                token:           null,
                isFetching:      false,
                isAuthenticated: false,
            }

        default:
            return state
    }
}
