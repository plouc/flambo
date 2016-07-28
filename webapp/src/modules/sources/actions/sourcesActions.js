/**
 * @module sources/actions/SourcesActions
 */
'use strict'

import { hashHistory }             from 'react-router'
import * as SourcesApi             from '../api/SourcesApi'
import { logout }                  from '../../auth/actions/authActions'
import newsItemsActionFactory      from '../../../lib/newsItemsActionFactory'
import newsItemsStatsActionFactory from '../../../lib/newsItemsStatsActionFactory'
import { notify }                  from '../../notifications/actions/notificationsActions'
import {
    NOTIFICATION_TYPE_SOURCE_CREATED,
} from '../../notifications/constants/notificationTypes'


export const REQUEST_SOURCES                  = 'REQUEST_SOURCES'
export const RECEIVE_SOURCES                  = 'RECEIVE_SOURCES'
export const SOURCES_FETCH_ERROR              = 'SOURCES_FETCH_ERROR'
export const INVALIDATE_SOURCES               = 'INVALIDATE_SOURCES'

export const REQUEST_SOURCE                   = 'REQUEST_SOURCE'
export const RECEIVE_SOURCE                   = 'RECEIVE_SOURCE'
export const SOURCE_FETCH_ERROR               = 'SOURCE_FETCH_ERROR'
export const INVALIDATE_SOURCE                = 'INVALIDATE_SOURCE'

export const CREATE_SOURCE                    = 'CREATE_SOURCE'
export const CREATE_SOURCE_SUCCESS            = 'CREATE_SOURCE_SUCCESS'
export const CREATE_SOURCE_FAILURE            = 'CREATE_SOURCE_FAILURE'

export const REQUEST_SOURCE_UPDATE            = 'REQUEST_SOURCE_UPDATE'
export const SOURCE_UPDATE_SUCCESS            = 'SOURCE_UPDATE_SUCCESS'
export const SOURCE_UPDATE_ERROR              = 'SOURCE_UPDATE_ERROR'

export const REQUEST_SOURCE_COLLECTION        = 'REQUEST_SOURCE_COLLECTION'
export const RECEIVE_SOURCE_COLLECTION_STATUS = 'RECEIVE_SOURCE_COLLECTION_STATUS'




// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
//
// SOURCES LIST
//
// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
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

const fetchSources = () => (dispatch, getState) => {
    dispatch(requestSources())

    const { auth: { token } } = getState()

    SourcesApi.list(token)
        .then(sources => {
            dispatch(receiveSources(sources))
        })
        .catch(status => {
            if (status === 401) {
                dispatch(logout())
            } else {
                dispatch(sourcesFetchError(status))
            }
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





// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
//
// GET SOURCE
//
// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
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

const fetchSource = id => (dispatch, getState) => {
    dispatch(requestSource(id))

    const { auth: { token } } = getState()

    SourcesApi.get(token, id)
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





// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
//
// SOURCE CREATION
//
// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
const createSourceInit = source => ({
    type: CREATE_SOURCE,
    source,
})

const createSourceSuccess = source => ({
    type:     CREATE_SOURCE_SUCCESS,
    sourceId: source.id,
    source,
})

const createSourceFailure = (source, error) => ({
    type: CREATE_SOURCE_FAILURE,
    source,
    error,
})

/**
 * This action creator is meant to be used with reduxForm() instead of connect(),
 * that's why the first argument is the data to submit,
 * we don't use the `actionName => dispatch => {}` form.
 *
 * Also note that token will be injected from component container using _.partial().
 *
 * @param {string}   token    - The topic JWT token
 * @param {Object}   source   - The source data
 * @param {function} dispatch - The redux dispatch function
 * @returns {Promise.<*>}
 */
export const createSource = (token, source, dispatch) => {
    dispatch(createSourceInit(source))

    return SourcesApi.create(token, source)
        .then(createdSource => {
            dispatch(createSourceSuccess(createdSource))
            dispatch(invalidateSources())
            dispatch(notify(NOTIFICATION_TYPE_SOURCE_CREATED, createdSource))
            hashHistory.push('/sources')
        })
        .catch(error => {
            dispatch(createSourceFailure(source, error))

            return Promise.reject(error)
        })
}





// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
//
// SOURCE UPDATE
//
// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
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



/**
 * This action creator is meant to be used with reduxForm() instead of connec(),
 * that's why the first argument is the data to submit.
 *
 * Also note that token will be injected from component container using _.partial().
 *
 * @param {string}   token    - The topic JWT token
 * @param {Object}   source   - The source data
 * @param {function} dispatch - The redux dispatch function
 * @returns {Promise.<*>}
 */
export const updateSource = (token, source, dispatch) => {
    dispatch(requestSourceUpdate(source.id, source))

    return SourcesApi.update(token, source.id, source)
        .then(updatedSource => {
            dispatch(sourceUpdateSuccess(source.id, updatedSource))
            dispatch(invalidateSources())
            dispatch(invalidateSource(source.id))
            dispatch(fetchSourceIfNeeded(source.id))
            //hashHistory.push(`/topics/${topic.id}`)
        })
        .catch(error => {
            //dispatch(updateTopicFailure(topic.id, topic, error))

            return Promise.reject(error)
        })
}





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

export const collectSource = id => (dispatch, getState) => {
    dispatch(requestSourceCollection(id))

    const { auth: { token } } = getState()

    SourcesApi.collect(token, id)
        .then(() => {})
}

export const fetchSourceNewsItems      = newsItemsActionFactory('sources', SourcesApi.getSourceNewsItems)
export const fetchSourceNewsItemsStats = newsItemsStatsActionFactory('sources', SourcesApi.getSourceNewsItemsStats)


