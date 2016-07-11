/**
 * @module sources/actions/SourceActions
 */
'use strict'

import { hashHistory }        from 'react-router'
import * as SourcesApi        from '../api/SourcesApi'
import { invalidateSources }  from './sourcesActions'
import newsItemsActionFactory from '../../../lib/itemNewsItemsActionFactory'
import {
    REQUEST_SOURCE_COLLECTION,
    RECEIVE_SOURCE_COLLECTION_STATUS,
    REQUEST_SOURCE,
    RECEIVE_SOURCE,
    SOURCE_FETCH_ERROR,
    INVALIDATE_SOURCE,
    REQUEST_SOURCE_NEWS_ITEMS,
    RECEIVE_SOURCE_NEWS_ITEMS,
    REQUEST_SOURCE_UPDATE,
    SOURCE_UPDATE_SUCCESS,
    SOURCE_UPDATE_ERROR,
} from '../constants/sourcesActionTypes'


/**
 * Creates a REQUEST_SOURCE_COLLECTION action.
 *
 * @method
 * @returns {{ type: string, sourceId: string }}
 */
const requestSourceCollection = sourceId => ({
    type: REQUEST_SOURCE_COLLECTION,
    sourceId,
})

const receiveSourceCollectionStatus = (sourceId, status) => ({
    type: RECEIVE_SOURCE_COLLECTION_STATUS,
    sourceId,
    status,
})

export const collectSource = id => dispatch => {
    dispatch(requestSourceCollection(id))

    SourcesApi.collect(id)
        .then(() => {})
}

/**
 * Creates a REQUEST_SOURCE action.
 *
 * @method
 * @returns {{ type: string, sourceId: string }}
 */
const requestSource = sourceId => ({
    type: REQUEST_SOURCE,
    sourceId,
})

/**
 * Creates a RECEIVE_SOURCE action.
 *
 * @method
 * @returns {{ type: string, sourceId: string }}
 */
const receiveSource = source => ({
    type:     RECEIVE_SOURCE,
    sourceId: source.id,
    source,
})

const sourceFetchError = (sourceId, status) => ({
    type: SOURCE_FETCH_ERROR,
    sourceId,
    status,
})

const fetchSource = id => dispatch => {
    dispatch(requestSource(id))

    SourcesApi.get(id)
        .then(source => {
            dispatch(receiveSource(source))
        })
        .catch(status => {
            dispatch(sourceFetchError(id, status))
        })
}

/**
 * Check if a source should be fetched.
 *
 * @param {Object} state - Current state
 * @param {string} id    - The source id
 * @returns {boolean}
 */
const shouldFetchSource = (state, id) => {
    const source = state.sourceById[id]

    if (!source) {
        return true
    } else if (source.isFetching) {
        return false
    } else {
        return source.didInvalidate
    }
}

/**
 * Fetch a source by its id if it does not exist
 * in current state or have been invalidated.
 *
 * @param {string} id - The source id
 * @returns {null|function}
 */
export function fetchSourceIfNeeded(id) {
    return (dispatch, getState) => {
        if (shouldFetchSource(getState(), id)) {
            return dispatch(fetchSource(id))
        }
    }
}

export const invalidateSource = sourceId => ({
    type: INVALIDATE_SOURCE,
    sourceId,
})

/**
 * Creates actions to fetch source news items for given id.
 */
export const fetchSourceNewsItems = newsItemsActionFactory(
    REQUEST_SOURCE_NEWS_ITEMS,
    RECEIVE_SOURCE_NEWS_ITEMS,
    'sourceId',
    SourcesApi.getSourceNewsItems
)

const requestSourceUpdate = (sourceId, source) => ({
    type: REQUEST_SOURCE_UPDATE,
    sourceId,
    source,
})

const sourceUpdateSuccess = (sourceId, source) => ({
    type: SOURCE_UPDATE_SUCCESS,
    sourceId,
    source,
})

export const updateSource = (id, source) => dispatch => {
    dispatch(requestSourceUpdate(id, source))

    SourcesApi.update(id, source)
        .then(updatedSource => {
            dispatch(sourceUpdateSuccess(id, updatedSource))
            dispatch(invalidateSource(id))
            dispatch(invalidateSources())
            hashHistory.push('/sources')
        })
}
