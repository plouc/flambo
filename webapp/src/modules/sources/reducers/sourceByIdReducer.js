/**
 * @module sources/reducers/SourceByIdReducer
 */
'use strict'

import { FETCH_STATUS_OK } from '../../core/constants/fetchStatuses'
import {
    REQUEST_SOURCE,
    RECEIVE_SOURCE,
    SOURCE_FETCH_ERROR,
    INVALIDATE_SOURCE,
    REQUEST_SOURCE_COLLECTION,
    RECEIVE_SOURCE_COLLECTION_STATUS,
} from '../constants/sourcesActionTypes'


const source = (state = {
    source:        null,
    isFetching:    false,
    didInvalidate: false,
    status:        FETCH_STATUS_OK,
}, action) => {
    switch (action.type) {
        case REQUEST_SOURCE:
            return {
                ...state,
                isFetching: true,
            }

        case RECEIVE_SOURCE:
            return {
                ...state,
                source:        action.source,
                status:        FETCH_STATUS_OK,
                isFetching:    false,
                didInvalidate: false,
            }

        case INVALIDATE_SOURCE:
            return {
                ...state,
                didInvalidate: true,
            }

        case SOURCE_FETCH_ERROR:
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


/**
 * @param {Object} state
 * @param {Object} action
 * @returns {{}}
 */
export default function sourceById(state = {}, action) {
    switch (action.type) {
        case REQUEST_SOURCE:
        case RECEIVE_SOURCE:
        case SOURCE_FETCH_ERROR:
        case INVALIDATE_SOURCE:
        case REQUEST_SOURCE_COLLECTION:
        case RECEIVE_SOURCE_COLLECTION_STATUS:
            return {
                ...state,
                [action.sourceId]: source(state[action.sourceId], action),
            }

        default:
            return state
    }
}
