'use strict'

import {
    REQUEST_ENTITY_NEWS_ITEMS_STATS,
    RECEIVE_ENTITY_NEWS_ITEMS_STATS,
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
    const requestItemNewsItemsStats = (id, filters) => ({
        type: REQUEST_ENTITY_NEWS_ITEMS_STATS,
        entity,
        id,
        filters,
    })

    const receiveItemNewsItemsStats = (id, stats) => ({
        type: RECEIVE_ENTITY_NEWS_ITEMS_STATS,
        entity,
        id,
        stats,
    })

    return (id, filters = {}) => {
        return (dispatch, getState) => {
            dispatch(requestItemNewsItemsStats(id, filters))

            const { auth: { token } } = getState()

            apiCall(token, id, { filters })
                .then(stats => {
                    dispatch(receiveItemNewsItemsStats(id, stats))
                })
        }
    }
}