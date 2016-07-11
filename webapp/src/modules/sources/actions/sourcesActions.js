/**
 * @module sources/actions/SourcesActions
 */
'use strict'

import * as SourcesApi from '../api/SourcesApi'
import {
    REQUEST_SOURCES,
    RECEIVE_SOURCES,
    SOURCES_FETCH_ERROR,
    INVALIDATE_SOURCES,
} from '../constants/sourcesActionTypes'


/**
 * Creates a REQUEST_SOURCES action.
 *
 * @method
 * @returns {{ type: string }}
 */
const requestSources = () => ({
    type: REQUEST_SOURCES,
})

/**
 * Creates a RECEIVE_SOURCES action.
 *
 * @method
 * @returns {{ type: string }}
 */
const receiveSources = sources => ({
    type: RECEIVE_SOURCES,
    sources,
})

const sourcesFetchError = status => ({
    type: SOURCES_FETCH_ERROR,
    status,
})

const fetchSources = () => dispatch => {
    dispatch(requestSources())

    SourcesApi.list()
        .then(sources => {
            dispatch(receiveSources(sources))
        })
        .catch(status => {
            dispatch(sourcesFetchError(status))
        })
}

/**
 * Check if sources should be fetched.
 *
 * @param {Object} state - Current state
 * @returns {boolean}
 */
const shouldFetchSources = (state) => {
    const { sources: { isFetching, didInvalidate } } = state

    if (isFetching) {
        return false
    } else {
        return didInvalidate
    }
}

/**
 * Fetch sources if they have been invalidated.
 *
 * @returns {null|function}
 */
export function fetchSourcesIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchSources(getState())) {
            return dispatch(fetchSources())
        }
    }
}

/**
 * Creates an action to invalidate current sources.
 *
 * @method
 * @returns {Object}
 */
export const invalidateSources = () => ({
    type: INVALIDATE_SOURCES,
})
