/**
 * @module topics/actions/TopicsActions
 */
'use strict'

import { hashHistory }             from 'react-router'
import * as TopicsApi              from '../api/TopicsApi'
import newsItemsActionFactory      from '../../../lib/newsItemsActionFactory'
import newsItemsStatsActionFactory from '../../../lib/newsItemsStatsActionFactory'
import { notify }                  from '../../notifications/actions/notificationsActions'
import {
    NOTIFICATION_TYPE_TOPIC_CREATED,
    NOTIFICATION_TYPE_TOPIC_DELETED,
} from '../../notifications/constants/notificationTypes'


export const FETCH_TOPICS                 = 'FETCH_TOPICS'
export const FETCH_TOPICS_SUCCESS         = 'FETCH_TOPICS_SUCCESS'
export const FETCH_TOPICS_FAILURE         = 'FETCH_TOPICS_FAILURE'
export const INVALIDATE_TOPICS            = 'INVALIDATE_TOPICS'

export const FILTER_TOPICS                = 'FILTER_TOPICS'

export const FETCH_TOPIC                  = 'FETCH_TOPIC'
export const FETCH_TOPIC_SUCCESS          = 'FETCH_TOPIC_SUCCESS'
export const FETCH_TOPIC_ERROR            = 'FETCH_TOPIC_ERROR'
export const INVALIDATE_TOPIC             = 'INVALIDATE_TOPIC'

export const REQUEST_TOPIC_PICTURE_UPLOAD = 'REQUEST_TOPIC_PICTURE_UPLOAD'
export const TOPIC_PICTURE_UPLOAD_SUCCESS = 'TOPIC_PICTURE_UPLOAD_SUCCESS'

export const UPDATE_TOPIC                 = 'UPDATE_TOPIC'
export const UPDATE_TOPIC_SUCCESS         = 'UPDATE_TOPIC_SUCCESS'
export const UPDATE_TOPIC_FAILURE         = 'UPDATE_TOPIC_FAILURE'

export const CREATE_TOPIC                 = 'CREATE_TOPIC'
export const CREATE_TOPIC_SUCCESS         = 'CREATE_TOPIC_SUCCESS'
export const CREATE_TOPIC_FAILURE         = 'CREATE_TOPIC_FAILURE'

export const DELETE_TOPIC                 = 'DELETE_TOPIC'
export const DELETE_TOPIC_SUCCESS         = 'DELETE_TOPIC_SUCCESS'
export const DELETE_TOPIC_FAILURE         = 'DELETE_TOPIC_FAILURE'

export const TOPIC_SUBSCRIPTION           = 'TOPIC_SUBSCRIPTION'
export const TOPIC_SUBSCRIPTION_SUCCESS   = 'TOPIC_SUBSCRIPTION_SUCCESS'
export const TOPIC_SUBSCRIPTION_FAILURE   = 'TOPIC_SUBSCRIPTION_FAILURE'

export const TOPIC_UNSUBSCRIPTION         = 'TOPIC_UNSUBSCRIPTION'
export const TOPIC_UNSUBSCRIPTION_SUCCESS = 'TOPIC_UNSUBSCRIPTION_SUCCESS'
export const TOPIC_UNSUBSCRIPTION_FAILURE = 'TOPIC_UNSUBSCRIPTION_FAILURE'


// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
//
// TOPICS LIST
//
// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
const fetchTopicsInit = () => ({ type: FETCH_TOPICS })

const fetchTopicsSuccess = topics => ({
    type: FETCH_TOPICS_SUCCESS,
    topics,
})

const fetchTopicsFailure = error => ({
    type: FETCH_TOPICS_FAILURE,
    error,
})

export const invalidateTopics = () => ({ type: INVALIDATE_TOPICS })

const shouldFetchTopics = state => {
    const { topics: { list: { loading, stale } } } = state

    if (loading) {
        return false
    } else {
        return stale
    }
}

const fetchTopics = () => (dispatch, getState) => {
    dispatch(fetchTopicsInit())

    const { auth: { token } } = getState()

    TopicsApi.list(token)
        .then(topics => {
            dispatch(fetchTopicsSuccess(topics))
        })
        .catch(error => {
            dispatch(fetchTopicsFailure(error))
        })
}

export const fetchTopicsIfNeeded = () => (dispatch, getState) => {
    if (shouldFetchTopics(getState())) {
        dispatch(fetchTopics())
    }
}

export const filterTopics = filters => ({
    type: FILTER_TOPICS,
    filters,
})





// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
//
// GET TOPIC
//
// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
const fetchTopicInit = topicId => ({
    type: FETCH_TOPIC,
    topicId,
})

const fetchTopicSuccess = topic => ({
    type:    FETCH_TOPIC_SUCCESS,
    topicId: topic.id,
    topic,
})

const fetchTopicError = (topicId, status) => ({
    type: FETCH_TOPIC_ERROR,
    topicId,
    status,
})

const shouldFetchTopic = (state, id) => {
    const topic = state.topics.byId[id]

    if (!topic) {
        return true
    } else if (topic.loading) {
        return false
    } else {
        return topic.stale
    }
}

const fetchTopic = id => (dispatch, getState) => {
    dispatch(fetchTopicInit(id))

    const { auth: { token } } = getState()

    TopicsApi.get(token, id)
        .then(topic => {
            dispatch(fetchTopicSuccess(topic))
        })
        .catch(status => {
            dispatch(fetchTopicError(id, status))
        })
}

export const fetchTopicIfNeeded = id => (dispatch, getState) => {
    if (shouldFetchTopic(getState(), id)) {
        return dispatch(fetchTopic(id))
    }
}

export const invalidateTopic = topicId => ({
    type: INVALIDATE_TOPIC,
    topicId,
})





// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
//
// TOPIC CREATION
//
// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
const createTopicInit = topic => ({
    type: CREATE_TOPIC,
    topic,
})

const createTopicSuccess = topic => ({
    type:    CREATE_TOPIC_SUCCESS,
    topicId: topic.id,
    topic,
})

const createTopicFailure = (topic, error) => ({
    type: CREATE_TOPIC_FAILURE,
    topic,
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
 * @param {Object}   topic    - The topic data
 * @param {function} dispatch - The redux dispatch function
 * @returns {Promise.<*>}
 */
export const createTopic = (token, topic, dispatch) => {
    dispatch(createTopicInit(topic))

    return TopicsApi.create(token, topic)
        .then(createdTopic => {
            dispatch(createTopicSuccess(createdTopic))
            dispatch(invalidateTopics())
            dispatch(notify(NOTIFICATION_TYPE_TOPIC_CREATED, createdTopic))
            hashHistory.push('/topics')
        })
        .catch(error => {
            dispatch(createTopicFailure(topic, error))

            return Promise.reject(error)
        })
}


// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
//
// TOPIC PICTURE
//
// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
const requestTopicPictureUpload = (id, file) => ({
    type: REQUEST_TOPIC_PICTURE_UPLOAD,
    file,
})

const topicPictureUploadSuccess = (id, file) => ({
    type: TOPIC_PICTURE_UPLOAD_SUCCESS,
    file,
})

export const uploadTopicPicture = (id, file) => dispatch => {
    dispatch(requestTopicPictureUpload(id, file))

    TopicsApi.uploadPicture(id, file)
        .then(() => {
            dispatch(topicPictureUploadSuccess(id, file))
        })
}





// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
//
// TOPIC SUBSCRIPTION
//
// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
const topicSubscriptionSuccess = topicId => ({
    type: TOPIC_SUBSCRIPTION_SUCCESS,
    topicId,
})

const topicSubscriptionFailure = (topicId, error) => ({
    type: TOPIC_SUBSCRIPTION_FAILURE,
    topicId,
    error,
})

export const subscribeToTopic = id => {
    return (dispatch, getState) => {
        dispatch({
            type:    TOPIC_SUBSCRIPTION,
            topicId: id,
        })

        const { auth: { token } } = getState()

        TopicsApi.subscribe(token, id)
        .then(() => {
            dispatch(topicSubscriptionSuccess(id))
        })
    }
}





// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
//
// TOPIC UNSUBSCRIPTION
//
// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
const topicUnsubscriptionSuccess = topicId => ({
    type: TOPIC_UNSUBSCRIPTION_SUCCESS,
    topicId,
})

const topicUnsubscriptionFailure = (topicId, error) => ({
    type: TOPIC_UNSUBSCRIPTION_FAILURE,
    topicId,
    error,
})

export const unsubscribeToTopic = id => {
    return (dispatch, getState) => {
        dispatch({
            type:    TOPIC_UNSUBSCRIPTION,
            topicId: id,
        })

        const { auth: { token } } = getState()

        TopicsApi.unsubscribe(token, id)
        .then(() => {
            dispatch(topicUnsubscriptionSuccess(id))
        })
    }
}





// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
//
// TOPIC REMOVAL
//
// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
const deleteTopicInit = topicId => ({
    type: DELETE_TOPIC,
    topicId,
})

const deleteTopicSuccess = topicId => ({
    type: DELETE_TOPIC_SUCCESS,
    topicId,
})

const deleteTopicFailure = (topicId, error) => ({
    type: DELETE_TOPIC_FAILURE,
    topicId,
    error,
})

export const deleteTopic = id => (dispatch, getState) => {
    dispatch(deleteTopicInit(id))

    const { auth: { token } } = getState()

    TopicsApi.deleteTopic(token, id)
        .then(() => {
            dispatch(deleteTopicSuccess(id))
            dispatch(notify(NOTIFICATION_TYPE_TOPIC_DELETED, { id }))
            hashHistory.push('/topics')
        })
        .catch(error => {
            dispatch(deleteTopicFailure(id, error))
        })
}





// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
//
// TOPIC UPDATE
//
// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
const updateTopicInit = (topicId, topic) => ({
    type: UPDATE_TOPIC,
    topicId,
    topic,
})

const updateTopicSuccess = (topicId, topic) => ({
    type: UPDATE_TOPIC_SUCCESS,
    topicId,
    topic,
})

const updateTopicFailure = (topicId, topic, error) => ({
    type: UPDATE_TOPIC_FAILURE,
    topicId,
    topic,
    error,
})

/**
 * This action creator is meant to be used with reduxForm() instead of connec(),
 * that's why the first argument is the data to submit.
 *
 * Also note that token will be injected from component container using _.partial().
 *
 * @param {string}   token    - The topic JWT token
 * @param {Object}   topic    - The topic data
 * @param {function} dispatch - The redux dispatch function
 * @returns {Promise.<*>}
 */
export const updateTopic = (token, topic, dispatch) => {
    dispatch(updateTopicInit(topic.id, topic))

    return TopicsApi.update(token, topic.id, topic)
        .then(topic => {
            dispatch(updateTopicSuccess(topic.id, topic))
            dispatch(invalidateTopics())
            dispatch(invalidateTopic(topic.id))
            dispatch(fetchTopicIfNeeded(topic.id))
            //hashHistory.push(`/topics/${topic.id}`)
        })
        .catch(error => {
            dispatch(updateTopicFailure(topic.id, topic, error))

            return Promise.reject(error)
        })
}





export const fetchTopicNewsItems      = newsItemsActionFactory('topics', TopicsApi.getTopicNewsItems)
export const fetchTopicNewsItemsStats = newsItemsStatsActionFactory('topics', TopicsApi.getTopicNewsItemsStats)

