/**
 * @param {string}   requestActionType
 * @param {string}   receiveActionType
 * @param {string}   idKey
 * @param {function} api
 * @returns {function()} The action generator function
 */
export default (
    requestActionType,
    receiveActionType,
    idKey,
    api
) => {
    const requestItemNewsItems = (id, page, limit, filters) => ({
        type: requestActionType,
        [idKey]: id,
        page,
        limit,
        filters,
    })

    const receiveItemNewsItems = (id, newsItems, total, page, limit) => ({
        type: receiveActionType,
        [idKey]: id,
        newsItems,
        total,
        page,
        limit,
    })

    return (id, page, limit, filters = {}) => {
        return dispatch => {
            dispatch(requestItemNewsItems(id, page, limit, filters))
            
            api(id, { page, limit, filters })
                .then(({ newsItems, total, page, limit }) => {
                    dispatch(receiveItemNewsItems(id, newsItems, total, page, limit))
                })
        }
    }
}