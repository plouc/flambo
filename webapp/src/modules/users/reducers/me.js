import * as actions from '../actions'

export default (state = {
    data:          null,
    isFetching:    false,
    didInvalidate: false,
    error:         null,
}, action) => {
    switch (action.type) {
        case actions.FETCH_ME_REQUEST:
            return {
                ...state,
                isFetching: true,
                error:      null,
            }

        case actions.FETCH_ME_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data:       action.data,
                error:      null,
            }

        case actions.FETCH_ME_FAILURE:
            return {
                ...state,
                isFetching: false,
                error:      action.error,
            }

        case actions.INVALIDATE_ME:
            return {
                ...state,
                didInvalidate: true,
            }

        default:
            return state
    }
}