/**
 *
 * @param {string} requestActionType
 * @param {string} receiveActionType
 * @param {string} idKey
 * @returns {function()} The reducer function
 */
export default (
    requestActionType,
    receiveActionType,
    idKey
) => {
    const itemNewsItems = (state = {
        page:          1,
        limit:         10,
        filters:       {},
        newsItems:     [],
        total:         0,
        isFetching:    false,
        didInvalidate: false
    }, action) => {
        switch (action.type) {
            case requestActionType:
                return {
                    ...state,
                    filters:    action.filters,
                    isFetching: true,
                }

            case receiveActionType:
                return {
                    ...state,
                    newsItems:     action.newsItems,
                    total:         action.total,
                    page:          action.page,
                    limit:         action.limit,
                    isFetching:    false,
                    didInvalidate: false,
                }
        }
    }

    return (state = {}, action) => {
        switch (action.type) {
            case requestActionType:
            case receiveActionType:
                return {
                    ...state,
                    [action[idKey]]: itemNewsItems(state[action[idKey]], action),
                }

            default:
                return state
        }
    }
}