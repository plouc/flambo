/**
 * @module topics/actions/TopicsActions
 */
'use strict'

import * as TopicsApi from '../api/TopicsApi'
import {
    REQUEST_TOPICS,
    RECEIVE_TOPICS,
    TOPICS_FETCH_ERROR,
    INVALIDATE_TOPICS,
} from '../constants/topicsActionTypes'


/**
 * Creates a REQUEST_TOPICS action.
 *
 * @method
 * @returns {{ type: string }}
 */
const requestTopics = () => ({
    type: REQUEST_TOPICS,
})

/**
 * Creates a RECEIVE_TOPICS action.
 *
 * @method
 * @returns {{ type: string }}
 */
const receiveTopics = topics => ({
    type: RECEIVE_TOPICS,
    topics,
})

const topicsFetchError = status => ({
    type: TOPICS_FETCH_ERROR,
    status,
})

const fetchTopics = () => dispatch => {
    dispatch(requestTopics())

    TopicsApi.list()
        .then(topics => {
            dispatch(receiveTopics(topics))
        })
        .catch(status => {
            dispatch(topicsFetchError(status))
        })
}

/**
 * Check if topics should be fetched.
 *
 * @param {Object} state - Current state
 * @returns {boolean}
 */
const shouldFetchTopics = (state) => {
    const { topics: { isFetching, didInvalidate } } = state

    if (isFetching) {
        return false
    } else {
        return didInvalidate
    }
}

/**
 * Fetch topics if they have been invalidated.
 *
 * @returns {null|function}
 */
export function fetchTopicsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchTopics(getState())) {
            return dispatch(fetchTopics())
        }
    }
}

/**
 * Creates an action to invalidate current topics.
 *
 * @method
 * @returns {Object}
 */
export const invalidateTopics = () => ({
    type: INVALIDATE_TOPICS,
})
