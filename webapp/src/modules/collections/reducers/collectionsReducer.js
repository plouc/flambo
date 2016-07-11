/**
 * @module collections/reducers/CollectionsReducer
 */
'use strict'

import { FETCH_STATUS_OK } from '../../core/constants/fetchStatuses'
import {
    REQUEST_COLLECTIONS,
    RECEIVE_COLLECTIONS,
    COLLECTIONS_FETCH_ERROR,
    INVALIDATE_COLLECTIONS,
} from '../constants/collectionsActionTypes'


export default function collections(state = {
    collections:   [],
    isFetching:    false,
    didInvalidate: true,
    status:        FETCH_STATUS_OK,
}, action) {
    switch (action.type) {
        case REQUEST_COLLECTIONS:
            return {
                ...state,
                isFetching: true,
            }

        case RECEIVE_COLLECTIONS:
            return {
                ...state,
                collections:   action.collections,
                status:        FETCH_STATUS_OK,
                isFetching:    false,
                didInvalidate: false,
            }

        case INVALIDATE_COLLECTIONS:
            return {
                ...state,
                didInvalidate: true,
            }

        case COLLECTIONS_FETCH_ERROR:
            return {
                ...state,
                status:        action.status,
                isFetching:    false,
                didInvalidate: false,
            }

        default:
            return state
    }
}
