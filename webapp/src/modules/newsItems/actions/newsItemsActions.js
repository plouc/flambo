/**
 * @module newsItems/actions/NewsItemsActions
 */
'use strict'

import * as NewsItemsApi from '../api/NewsItemsApi'
import {
    REQUEST_NEWS_ITEMS,
    RECEIVE_NEWS_ITEMS,
    INVALIDATE_NEWS_ITEMS,
} from '../constants/newsItemsActionTypes'


/**
 * Creates a REQUEST_NEWS_ITEMS action.
 *
 * @method
 * @returns {{ type: string }}
 */
const requestNewsItems = (page, limit, filters) => ({
    type: REQUEST_NEWS_ITEMS,
    page,
    limit,
    filters,
})

/**
 * Creates a RECEIVE_NEWS_ITEMS action.
 *
 * @method
 * @returns {{ type: string, newsItems: Array.<NewsItem> }}
 */
const receiveNewsItems = (newsItems, total, limit, page) => ({
    type: RECEIVE_NEWS_ITEMS,
    newsItems,
    limit,
    page,
    total,
})

const fetchNewsItems = (page, limit, filters) => dispatch => {
    dispatch(requestNewsItems(page, limit, filters))

    NewsItemsApi.list({ limit, page, filters })
        .then(({ newsItems, total, limit, page }) => {
            dispatch(receiveNewsItems(newsItems, total, limit, page))
        })
}

/**
 * Check if news items should be fetched.
 *
 * @param {Object} state - Current state
 * @returns {boolean}
 */
const shouldFetchNewsItems = (state, page, limit, filters) => {
    return true

    const { newsItems: { isFetching, didInvalidate } } = state

    if (isFetching) {
        return false
    } else {
        return didInvalidate
    }
}

/**
 * Fetch news items if they have been invalidated.
 *
 * @returns {null|function}
 */
export function fetchNewsItemsIfNeeded(page, limit, filters) {
    return (dispatch, getState) => {
        if (shouldFetchNewsItems(getState(), page, limit, filters)) {
            return dispatch(fetchNewsItems(page, limit, filters))
        }
    }
}

/**
 * Creates an action to invalidate current news items.
 *
 * @method
 * @returns {Object}
 */
export const invalidateNewsItems = () => ({
    type: INVALIDATE_NEWS_ITEMS,
})
