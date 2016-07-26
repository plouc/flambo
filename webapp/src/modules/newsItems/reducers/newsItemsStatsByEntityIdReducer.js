/**
 * @module newsItems/reducers/newsItemsStatsByEntityIdReducer
 */
'use strict'

import { FETCH_STATUS_OK } from '../../core/constants/fetchStatuses'
import {
    REQUEST_ENTITY_NEWS_ITEMS_STATS,
    RECEIVE_ENTITY_NEWS_ITEMS_STATS,
} from '../constants/newsItemsActionTypes'


const entityNewsItemsStats = (state = {
    months:        [],
    sourceTypes:   [],
    isFetching:    false,
    didInvalidate: false
}, action) => {
    switch (action.type) {
        case REQUEST_ENTITY_NEWS_ITEMS_STATS:
            return {
                ...state,
                filters:    action.filters,
                isFetching: true,
            }

        case RECEIVE_ENTITY_NEWS_ITEMS_STATS:
            const { months, sourceTypes } = action.stats

            return {
                ...state,
                months,
                sourceTypes,
                isFetching:    false,
                didInvalidate: false,
            }
    }
}

export default function newsItemsStatsByEntityId(state = {}, action) {
    switch (action.type) {
        case REQUEST_ENTITY_NEWS_ITEMS_STATS:
        case RECEIVE_ENTITY_NEWS_ITEMS_STATS:
            let newsItemsStatsByEntityType
            if (!state[action.entity]) {
                newsItemsStatsByEntityType = {}
            } else {
                newsItemsStatsByEntityType = state[action.entity]
            }

            return {
                ...state,
                [action.entity]: {
                    ...newsItemsStatsByEntityType,
                    [action.id]: entityNewsItemsStats(newsItemsStatsByEntityType[action.id], action),
                },
            }

        default:
            return state
    }
}