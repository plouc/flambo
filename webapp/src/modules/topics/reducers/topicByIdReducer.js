/**
 * @module topics/reducers/TopicByIdReducer
 */
'use strict'

import { FETCH_STATUS_OK } from '../../core/constants/fetchStatuses'
import {
    REQUEST_TOPIC,
    RECEIVE_TOPIC,
    TOPIC_FETCH_ERROR,
    INVALIDATE_TOPIC,
} from '../constants/topicsActionTypes'


const topic = (state = {
    topic:         null,
    isFetching:    false,
    didInvalidate: false,
    status:        FETCH_STATUS_OK,
}, action) => {
    switch (action.type) {
        case REQUEST_TOPIC:
            return {
                ...state,
                isFetching: true,
            }

        case RECEIVE_TOPIC:
            return {
                ...state,
                topic:         action.topic,
                status:        FETCH_STATUS_OK,
                isFetching:    false,
                didInvalidate: false,
            }

        case INVALIDATE_TOPIC:
            return {
                ...state,
                didInvalidate: true,
            }

        case TOPIC_FETCH_ERROR:
            return {
                ...state,
                isFetching:    false,
                didInvalidate: false,
                status:        action.status,
            }

        default:
            return state
    }
}


export default function topicById(state = {}, action) {
    switch (action.type) {
        case REQUEST_TOPIC:
        case RECEIVE_TOPIC:
        case TOPIC_FETCH_ERROR:
        case INVALIDATE_TOPIC:
            return {
                ...state,
                [action.topicId]: topic(state[action.topicId], action),
            }

        default:
            return state
    }
}
