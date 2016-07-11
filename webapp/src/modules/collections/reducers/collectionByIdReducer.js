/**
 * @module collections/reducers/CollectionByIdReducer
 */
'use strict'

import { FETCH_STATUS_OK } from '../../core/constants/fetchStatuses'
import {
    REQUEST_COLLECTION,
    RECEIVE_COLLECTION,
    COLLECTION_FETCH_ERROR,
    INVALIDATE_COLLECTION,
} from '../constants/collectionsActionTypes'


const collection = (state = {
    collection:    null,
    isFetching:    false,
    didInvalidate: false,
    status:        FETCH_STATUS_OK,
}, action) => {
    switch (action.type) {
        case REQUEST_COLLECTION:
            return {
                ...state,
                isFetching: true,
            }

        case RECEIVE_COLLECTION:
            return {
                ...state,
                collection:    action.collection,
                status:        FETCH_STATUS_OK,
                isFetching:    false,
                didInvalidate: false,
            }

        case INVALIDATE_COLLECTION:
            return {
                ...state,
                didInvalidate: true,
            }

        case COLLECTION_FETCH_ERROR:
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


export default function collectionById(state = {}, action) {
    switch (action.type) {
        case REQUEST_COLLECTION:
        case RECEIVE_COLLECTION:
        case COLLECTION_FETCH_ERROR:
        case INVALIDATE_COLLECTION:
            return {
                ...state,
                [action.collectionId]: collection(state[action.collectionId], action),
            }

        default:
            return state
    }
}
