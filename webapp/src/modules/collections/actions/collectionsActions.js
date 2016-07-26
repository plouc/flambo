/**
 * @module collections/actions/CollectionsActions
 */
'use strict'

import * as CollectionsApi from '../api/CollectionsApi'
import {
    REQUEST_COLLECTIONS,
    RECEIVE_COLLECTIONS,
    COLLECTIONS_FETCH_ERROR,
    INVALIDATE_COLLECTIONS,
} from '../constants/collectionsActionTypes'


/**
 * Creates a REQUEST_COLLECTIONS action.
 *
 * @method
 * @returns {{ type: string }}
 */
const requestCollections = () => ({
    type: REQUEST_COLLECTIONS,
})

/**
 * Creates a RECEIVE_COLLECTIONS action.
 *
 * @method
 * @returns {{ type: string }}
 */
const receiveCollections = collections => ({
    type: RECEIVE_COLLECTIONS,
    collections,
})

const collectionsFetchError = status => ({
    type: COLLECTIONS_FETCH_ERROR,
    status,
})

const fetchCollections = () => (dispatch, getState) => {
    dispatch(requestCollections())

    const { auth: { token } } = getState()

    CollectionsApi.list(token)
        .then(collections => {
            dispatch(receiveCollections(collections))
        })
        .catch(status => {
            dispatch(collectionsFetchError(status))
        })
}

/**
 * Check if collections should be fetched.
 *
 * @param {Object} state - Current state
 * @returns {boolean}
 */
const shouldFetchCollections = ({ collections: { isFetching, didInvalidate } }) => {
    if (isFetching) {
        return false
    } else {
        return didInvalidate
    }
}

/**
 * Fetch collections if they have been invalidated.
 *
 * @returns {null|function}
 */
export function fetchCollectionsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchCollections(getState())) {
            return dispatch(fetchCollections())
        }
    }
}

/**
 * Creates an action to invalidate current collections.
 *
 * @method
 * @returns {Object}
 */
export const invalidateCollections = () => ({
    type: INVALIDATE_COLLECTIONS,
})
