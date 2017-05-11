/**
 * @module newsItems/reducers/NewsItemsReducer
 */
'use strict'

import {
    REQUEST_NEWS_ITEMS,
    RECEIVE_NEWS_ITEMS,
    INVALIDATE_NEWS_ITEMS,
} from '../constants/newsItemsActionTypes'


export default function newsItems(state = {
    limit:         10,
    page:          1,
    filters:       {},
    newsItems:     [],
    total:         0,
    isFetching:    false,
    didInvalidate: true,
}, action) {
    switch (action.type) {
        case REQUEST_NEWS_ITEMS:
            return {
                ...state,
                filters:    action.filters,
                isFetching: true,
            }

        case RECEIVE_NEWS_ITEMS:
            return {
                ...state,
                newsItems:     action.newsItems,
                total:         action.total,
                page:          action.page,
                isFetching:    false,
                didInvalidate: false,
            }

        case INVALIDATE_NEWS_ITEMS:
            return {
                ...state,
                didInvalidate: true,
            }

        default:
            return state
    }
}
