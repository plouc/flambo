const shouldFetchItem = (namespace, id, state) => {
    const byId = state[namespace].byId
    const item = byId[id]

    if (!item)           return true
    if (item.isFetching) return false

    return item.didInvalidate
}

export function fetchItemIfNeeded(namespace, fetchAction) {
    return id => {
        return (dispatch, getState) => {
            if (shouldFetchItem(namespace, id, getState())) {
                return dispatch(fetchAction(id))
            }

            return Promise.resolve()
        }
    }
}

export const fetchTime = payload => ({ ...payload, fetchedAt: Date.now() })
