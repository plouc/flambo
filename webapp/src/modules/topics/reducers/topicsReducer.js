/**
 * @module topics/reducers/TopicsReducer
 */
'use strict'

import { FETCH_STATUS_OK } from '../../core/constants/fetchStatuses'
import {
    REQUEST_TOPICS,
    RECEIVE_TOPICS,
    TOPICS_FETCH_ERROR,
    INVALIDATE_TOPICS,
} from '../constants/topicsActionTypes'


export default function topics(state = {
    topics:        [],
    isFetching:    false,
    didInvalidate: true,
    status:        FETCH_STATUS_OK,
}, action) {
    switch (action.type) {
        case REQUEST_TOPICS:
            return {
                ...state,
                isFetching: true,
            }

        case RECEIVE_TOPICS:
            return {
                ...state,
                topics:        action.topics,
                status:        FETCH_STATUS_OK,
                isFetching:    false,
                didInvalidate: false,
            }

        case TOPICS_FETCH_ERROR:
            return {
                ...state,
                status:        action.status,
                isFetching:    false,
                didInvalidate: false,
            }

        case INVALIDATE_TOPICS:
            return {
                ...state,
                didInvalidate: true,
            }

        default:
            return state
    }
}
