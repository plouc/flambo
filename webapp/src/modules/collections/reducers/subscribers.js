import _            from 'lodash'

import * as actions from '../actions'


const collection = (state = {
    perPage:       10,
    page:          1,
    sort:          {},
    filters:       {},
    hasNextPage:   false,
    fetchedAt:     null,
    isFetching:    false,
    didInvalidate: true,
    byId:          {},
    currentIds:    [],
    error:         null,
}, action) => {
    switch (action.type) {
        case actions.FETCH_COLLECTION_SUBSCRIBERS_REQUEST:
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

        case actions.FETCH_COLLECTION_SUBSCRIBERS_SUCCESS:
            return {
                ...state,
                isFetching:    false,
                fetchedAt:     action.fetchedAt,
                didInvalidate: false,
                error:         null,
                hasNextPage:   action.next_page !== null,
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

        case actions.FETCH_COLLECTION_SUBSCRIBERS_FAILURE:
            return {
                ...state,
                isFetching:    false,
                didInvalidate: false,
                error:         action.error,
            }

        case actions.INVALIDATE_COLLECTION_SUBSCRIBERS:
            return {
                ...state,
                didInvalidate: true,
                hasNextPage:   false,
            }

        default:
            return state
    }
}

export default (state = {
    byId: {},
}, action) => {
    switch (action.type) {
        case actions.FETCH_COLLECTION_SUBSCRIBERS_REQUEST:
        case actions.FETCH_COLLECTION_SUBSCRIBERS_SUCCESS:
        case actions.FETCH_COLLECTION_SUBSCRIBERS_FAILURE:
        case actions.INVALIDATE_COLLECTION_SUBSCRIBERS:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: collection(state.byId[action.id], action),
                }
            }

        default:
            return state
    }
}
