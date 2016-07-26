'use strict'

import {
    REQUEST_ENTITY_NEWS_ITEMS,
    RECEIVE_ENTITY_NEWS_ITEMS,
} from '../modules/newsItems/constants/newsItemsActionTypes'


/**
 * @param {string}   entity
 * @param {function} apiCall
 * @returns {function()} The action generator function
 */
export default (
    entity,
    apiCall
) => {
    const requestItemNewsItems = (id, page, limit, filters) => ({
        type: REQUEST_ENTITY_NEWS_ITEMS,
        entity,
        id,
        page,
        limit,
        filters,
    })

    const receiveItemNewsItems = (id, newsItems, total, page, limit) => ({
        type: RECEIVE_ENTITY_NEWS_ITEMS,
        entity,
        id,
        newsItems,
        total,
        page,
        limit,
    })

    return (id, page, limit, filters = {}) => {
        return (dispatch, getState) => {
            dispatch(requestItemNewsItems(id, page, limit, filters))

            const { auth: { token } } = getState()

            apiCall(token, id, { page, limit, filters })
                .then(({ newsItems, total, page, limit }) => {
                    dispatch(receiveItemNewsItems(id, newsItems, total, page, limit))
                })
        }
    }
}