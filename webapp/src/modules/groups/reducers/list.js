import _            from 'lodash'
import * as actions from '../actions'


const group = (state = {
    data:          null,
    isFetching:    false,
    didInvalidate: false,
    error:         null,
}, action) => {
    switch (action.type) {
        case actions.FETCH_GROUP_REQUEST:
            return {
                ...state,
                isFetching: true,
                error:      null,
            }

        case actions.FETCH_GROUP_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data:       action.data,
                error:      null,
            }

        case actions.FETCH_GROUP_FAILURE:
            return {
                ...state,
                isFetching: false,
                error:      action.error,
            }

        case actions.INVALIDATE_GROUP:
            return {
                ...state,
                didInvalidate: true,
            }

        default:
            return state
    }
}

export default (state = {
    perPage:       10,
    page:          1,
    hasNextPage:   false,
    fetchedAt:     null,
    isFetching:    false,
    didInvalidate: true,
    byId:          {},
    currentIds:    [],
    error:         null,
}, action) => {
    switch (action.type) {
        case actions.FETCH_GROUPS_REQUEST:
            return {
                ...state,
                perPage:     action.perPage,
                page:        action.page,
                sort:        action.sort,
                filters:     action.filters,
                hasNextPage: false,
                isFetching:  true,
                error:       null,
            }

        case actions.FETCH_GROUPS_SUCCESS:
            let currentIds = action.items.map(({ id }) => id)
            if (state.didInvalidate === false) {
                currentIds = [
                    ...state.currentIds,
                    ...currentIds,
                ]
            }

            return {
                ...state,
                isFetching:    false,
                fetchedAt:     action.fetchedAt,
                didInvalidate: false,
                error:         null,
                hasNextPage:   action.next_page !== null,
                currentIds,
                byId:          {
                    ...state.byId,
                    ..._.keyBy(action.items.map(i => ({
                        id:         i.id,
                        isFetching: false,
                        data:       i,
                    })), 'id'),
                },
            }

        case actions.FETCH_GROUPS_FAILURE:
            return {
                ...state,
                isFetching:    false,
                didInvalidate: false,
                error:         action.error,
            }

        case actions.INVALIDATE_GROUPS:
            return {
                ...state,
                didInvalidate: true,
                hasNextPage:   false,
            }

        case actions.FETCH_GROUP_REQUEST:
        case actions.FETCH_GROUP_SUCCESS:
        case actions.FETCH_GROUP_FAILURE:
        case actions.INVALIDATE_GROUP:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: group(state.byId[action.id], action),
                }
            }

        default:
            return state
    }
}
