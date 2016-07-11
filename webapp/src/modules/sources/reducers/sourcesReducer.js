/**
 * @module sources/reducers/SourcesReducer
 */
'use strict'

import { FETCH_STATUS_OK } from '../../core/constants/fetchStatuses'
import {
    REQUEST_SOURCES,
    RECEIVE_SOURCES,
    SOURCES_FETCH_ERROR,
    INVALIDATE_SOURCES,
} from '../constants/sourcesActionTypes'


export default function sources(state = {
    sources:       [],
    isFetching:    false,
    didInvalidate: true,
    status:        FETCH_STATUS_OK,
}, action) {
    switch (action.type) {
        case REQUEST_SOURCES:
            return {
                ...state,
                isFetching: true,
            }

        case RECEIVE_SOURCES:
            return {
                ...state,
                sources:       action.sources,
                status:        FETCH_STATUS_OK,
                isFetching:    false,
                didInvalidate: false,
            }

        case SOURCES_FETCH_ERROR:
            return {
                ...state,
                status:        action.status,
                isFetching:    false,
                didInvalidate: false,
            }

        case INVALIDATE_SOURCES:
            return {
                ...state,
                didInvalidate: true,
            }

        default:
            return state
    }
}
