import createListReducer from '../../../core/reducers/createListReducer'
import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    INVALIDATE_USERS,
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    INVALIDATE_USER,
} from '../actions'


export default createListReducer({
    actionTypes: {
        request:        FETCH_USERS_REQUEST,
        success:        FETCH_USERS_SUCCESS,
        failure:        FETCH_USERS_FAILURE,
        invalidate:     INVALIDATE_USERS,
        requestItem:    FETCH_USER_REQUEST,
        successItem:    FETCH_USER_SUCCESS,
        failureItem:    FETCH_USER_FAILURE,
        invalidateItem: INVALIDATE_USER,
    },
    defaultFilters: {},
    perPage:        10,
})
