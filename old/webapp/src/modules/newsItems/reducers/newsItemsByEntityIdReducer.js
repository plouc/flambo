/**
 * @module newsItems/reducers/newsItemsByEntityIdReducer
 */
'use strict'

import { FETCH_STATUS_OK } from '../../core/constants/fetchStatuses'
import {
    REQUEST_ENTITY_NEWS_ITEMS,
    RECEIVE_ENTITY_NEWS_ITEMS,
} from '../constants/newsItemsActionTypes'


const entityNewsItems = (state = {
    page:          1,
    limit:         10,
    filters:       {},
    newsItems:     [],
    total:         0,
    isFetching:    false,
    didInvalidate: false
}, action) => {
    switch (action.type) {
        case REQUEST_ENTITY_NEWS_ITEMS:
            return {
                ...state,
                filters:    action.filters,
                isFetching: true,
            }

        case RECEIVE_ENTITY_NEWS_ITEMS:
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

export default function newsItemsByEntityId(state = {}, action) {
    switch (action.type) {
        case REQUEST_ENTITY_NEWS_ITEMS:
        case RECEIVE_ENTITY_NEWS_ITEMS:
            let newsItemsByEntityType
            if (!state[action.entity]) {
                newsItemsByEntityType = {}
            } else {
                newsItemsByEntityType = state[action.entity]
            }

            return {
                ...state,
                [action.entity]: {
                    ...newsItemsByEntityType,
                    [action.id]: entityNewsItems(newsItemsByEntityType[action.id], action),
                },
            }

        default:
            return state
    }
}