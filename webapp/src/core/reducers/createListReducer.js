import _ from 'lodash'


const createListReducer = ({
    actionTypes: {
        request,
        success,
        failure,
        invalidate,
        requestItem,
        successItem,
        failureItem,
        invalidateItem,
    },
    defaultSort,
    defaultFilters,
    perPage = 10,
}) => {
    const item = (state = {
        data:          null,
        isFetching:    false,
        didInvalidate: false,
        error:         null,
    }, action) => {
        switch (action.type) {
            case requestItem:
                return {
                    ...state,
                    isFetching: true,
                    error:      null,
                }

            case successItem:
                return {
                    ...state,
                    isFetching: false,
                    data:       action.data,
                    error:      null,
                }

            case failureItem:
                return {
                    ...state,
                    isFetching: false,
                    error:      action.error,
                }

            case invalidateItem:
                return {
                    ...state,
                    didInvalidate: true,
                }

            default:
                return state
        }
    }

    return (state = {
        perPage,
        page:          1,
        sort:          defaultSort,
        filters:       defaultFilters,
        hasNextPage:   false,
        fetchedAt:     null,
        isFetching:    false,
        didInvalidate: true,
        byId:          {},
        currentIds:    [],
        error:         null,
    }, action) => {
        switch (action.type) {
            case request:
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

            case success:
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

            case failure:
                return {
                    ...state,
                    isFetching:    false,
                    didInvalidate: false,
                    error:         action.error,
                }

            case invalidate:
                return {
                    ...state,
                    didInvalidate: true,
                    hasNextPage:   false,
                }

            case requestItem:
            case successItem:
            case failureItem:
            case invalidateItem:
                return {
                    ...state,
                    byId: {
                        ...state.byId,
                        [action.id]: item(state.byId[action.id], action),
                    }
                }

            default:
                return state
        }
    }
}

export default createListReducer
