/**
 * @module newsItems/reducers/newsItemsHistogram
 */
'use strict'

import {
    REQUEST_NEWS_ITEMS_STATS,
    RECEIVE_NEWS_ITEMS_STATS,
    INVALIDATE_NEWS_ITEMS_STATS,
} from '../constants/newsItemsActionTypes'


export default function newsItemsStats(state = {
    months:        [],
    sourceTypes:   [],
    isFetching:    false,
    didInvalidate: true,
}, action) {
    switch (action.type) {
        case REQUEST_NEWS_ITEMS_STATS:
            return {
                ...state,
                isFetching: true,
            }

        case RECEIVE_NEWS_ITEMS_STATS:
            const { months, sourceTypes } = action.stats

            return {
                ...state,
                months,
                sourceTypes,
                isFetching:    false,
                didInvalidate: false,
            }

        case INVALIDATE_NEWS_ITEMS_STATS:
            return {
                ...state,
                didInvalidate: true,
            }

        default:
            return state
    }
}
