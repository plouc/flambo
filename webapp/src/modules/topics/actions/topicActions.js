/**
 * @module topics/actions/TopicActions
 */
'use strict'

import { hashHistory }        from 'react-router'
import * as TopicsApi         from '../api/TopicsApi'
import { invalidateTopics }   from './topicsActions'
import newsItemsActionFactory from '../../../lib/itemNewsItemsActionFactory'
import {
    REQUEST_TOPIC,
    RECEIVE_TOPIC,
    TOPIC_FETCH_ERROR,
    INVALIDATE_TOPIC,
    REQUEST_TOPIC_UPDATE,
    TOPIC_UPDATE_SUCCESS,
    REQUEST_TOPIC_CREATION,
    TOPIC_CREATION_SUCCESS,
    TOPIC_CREATION_ERROR,
    REQUEST_TOPIC_NEWS_ITEMS,
    RECEIVE_TOPIC_NEWS_ITEMS,
    REQUEST_TOPIC_PICTURE_UPLOAD,
    TOPIC_PICTURE_UPLOAD_SUCCESS,
} from '../constants/topicsActionTypes'


const requestTopic = topicId => ({
    type: REQUEST_TOPIC,
    topicId,
})

const receiveTopic = topic => ({
    type:    RECEIVE_TOPIC,
    topicId: topic.id,
    topic,
})

const topicFetchError = (topicId, status) => ({
    type: TOPIC_FETCH_ERROR,
    topicId,
    status,
})

const fetchTopic = id => dispatch => {
    dispatch(requestTopic(id))

    TopicsApi.get(id)
        .then(topic => {
            dispatch(receiveTopic(topic))
        })
        .catch(status => {
            dispatch(topicFetchError(id, status))
        })
}

/**
 * Check if a topic should be fetched.
 *
 * @param {Object} state - Current state
 * @param {string} id    - The topic id
 * @returns {boolean}
 */
const shouldFetchTopic = (state, id) => {
    const topic = state.topicById[id]

    if (!topic) {
        return true
    } else if (topic.isFetching) {
        return false
    } else {
        return topic.didInvalidate
    }
}

/**
 * Fetch a topic by its id if it does not exist
 * in current state or have been invalidated.
 *
 * @param {string} id - The topic id
 * @returns {null|function}
 */
export function fetchTopicIfNeeded(id) {
    return (dispatch, getState) => {
        if (shouldFetchTopic(getState(), id)) {
            return dispatch(fetchTopic(id))
        }
    }
}

export const invalidateTopic = topicId => ({
    type: INVALIDATE_TOPIC,
    topicId,
})

const requestTopicCreation = topic => ({
    type: REQUEST_TOPIC_CREATION,
    topic,
})

const topicCreationSuccess = topic => ({
    type:    TOPIC_CREATION_SUCCESS,
    topicId: topic.id,
    topic,
})

const topicCreationError = (topic, error) => ({
    type: TOPIC_CREATION_ERROR,
    topic,
    error,
})

export function createTopic(topic) {
    return dispatch => {
        dispatch(requestTopicCreation(topic))

        TopicsApi.create(topic)
            .then(({ topic, hasError, errors }) => {
                dispatch(topicCreationSuccess(topic))
                dispatch(invalidateTopics())
                hashHistory.push('/topics')
            })
            .catch(error => {
                dispatch(topicCreationError(topic, error))
            })
    }
}

const requestTopicPictureUpload = (id, file) => ({
    type: REQUEST_TOPIC_PICTURE_UPLOAD,
    file,
})

const topicPictureUploadSuccess = (id, file) => ({
    type: TOPIC_PICTURE_UPLOAD_SUCCESS,
    file,
})

export function uploadTopicPicture(id, file) {
    return dispatch => {
        dispatch(requestTopicPictureUpload(id, file))

        TopicsApi.uploadPicture(id, file)
            .then(() => {
                dispatch(topicPictureUploadSuccess(id, file))
            })
    }
}

const requestTopicUpdate = (topicId, topic) => ({
    type: REQUEST_TOPIC_UPDATE,
    topicId,
    topic,
})

const topicUpdateSuccess = (topicId, topic) => ({
    type: TOPIC_UPDATE_SUCCESS,
    topicId,
    topic,
})

export const updateTopic = (id, topic) => dispatch => {
    dispatch(requestTopicUpdate(id, topic))

    TopicsApi.update(id, topic)
        .then(updatedTopic => {
            dispatch(topicUpdateSuccess(id, updatedTopic))
            dispatch(invalidateTopic(id))
            dispatch(invalidateTopics())
            hashHistory.push('/topics')
        })
}

/**
 * Creates actions to fetch topic news items for given id.
 */
export const fetchTopicNewsItems = newsItemsActionFactory(
    REQUEST_TOPIC_NEWS_ITEMS,
    RECEIVE_TOPIC_NEWS_ITEMS,
    'topicId',
    TopicsApi.getTopicNewsItems
)
