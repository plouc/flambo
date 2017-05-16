import _ from 'lodash'

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


const user = (state = {
    data:          null,
    isFetching:    false,
    didInvalidate: false,
    error:         null,
}, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                isFetching: true,
                error:      null,
            }

        case FETCH_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data:       action.data,
                error:      null,
            }

        case FETCH_USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                error:      action.error,
            }

        case INVALIDATE_USER:
            return {
                ...state,
                didInvalidate: true,
            }

        default:
            return state
    }
}

export default function users(state = {
    sort:          {},
    filters:       {},
    hasMore:       false,
    fetchedAt:     null,
    isFetching:    false,
    didInvalidate: true,
    byId:          {},
    byIndex:       {},
    currentIds:    [],
    error:         null,
}, action) {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                sort:        action.sort,
                filters:     action.filters,
                hasNextPage: false,
                isFetching:  true,
                error:       null,
            }

        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                isFetching:    false,
                fetchedAt:     action.fetchedAt,
                didInvalidate: false,
                error:         null,
                hasMore:       action.has_more !== null,
                currentIds:    action.items.map(({ id }) => id),
                byId:          {
                    ...state.byId,
                    ..._.keyBy(action.items.map(i => ({
                        id:         i.id,
                        isFetching: false,
                        data:       i,
                    })), 'id'),
                },
            }

        case FETCH_USERS_FAILURE:
            return {
                ...state,
                isFetching:    false,
                didInvalidate: false,
                error:         action.error,
            }

        case INVALIDATE_USERS:
            return {
                ...state,
                didInvalidate: true,
                hasMore:       false,
            }
        case FETCH_USER_REQUEST:
        case FETCH_USER_SUCCESS:
        case FETCH_USER_FAILURE:
        case INVALIDATE_USER:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: user(state.byId[action.id], action),
                }
            }

        default:
            return state
    }
}
