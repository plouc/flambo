/**
 * @module topics/reducers/TopicsReducer
 */
'use strict'

import _ from 'lodash'
import {
    FETCH_TOPICS, FETCH_TOPICS_SUCCESS, FETCH_TOPICS_FAILURE, INVALIDATE_TOPICS,
    FETCH_TOPIC, FETCH_TOPIC_SUCCESS, FETCH_TOPIC_ERROR, INVALIDATE_TOPIC,
    CREATE_TOPIC, CREATE_TOPIC_SUCCESS, CREATE_TOPIC_FAILURE,
    UPDATE_TOPIC, UPDATE_TOPIC_SUCCESS, UPDATE_TOPIC_FAILURE,
    DELETE_TOPIC_SUCCESS,
    TOPIC_SUBSCRIPTION_SUCCESS,
    TOPIC_UNSUBSCRIPTION_SUCCESS,
} from '../actions/topicsActions'


/**
 * (sub) Reducer for single topic.
 *
 * @param {Object} state  - The current state
 * @param {Object} action - The current action
 * @returns {Object} The updated state or current if no action match
 */
const topic = (state = {
    topic:   null,
    loading: false,
    stale:   false,
    error:   null,
}, action) => {
    switch (action.type) {
        case FETCH_TOPIC:
            return {
                ...state,
                loading: true,
            }

        case FETCH_TOPIC_SUCCESS:
            return {
                ...state,
                topic:   action.topic,
                error:   null,
                loading: false,
                stale:   false,
            }

        case INVALIDATE_TOPIC:
            return {
                ...state,
                stale: true,
            }

        case FETCH_TOPIC_ERROR:
            return {
                ...state,
                loading: false,
                stale:   false,
                error:   action.status,
            }

        case TOPIC_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                topic: { ...state.topic, subscribed: true }
            }

        case TOPIC_UNSUBSCRIPTION_SUCCESS:
            return {
                ...state,
                topic: { ...state.topic, subscribed: false }
            }

        default:
            return state
    }
}

/**
 * Global reducer for topics.
 *
 * @param {Object} state  - The current state
 * @param {Object} action - The current action
 * @returns {Object} The updated state or current if no action match
 */
export default function topics(state = {
    list:    {
        loading: false,
        stale:   true,
        error:   null,
        items:   [],
    },
    byId:     {},
    creation: {
        topic:   {},
        loading: false,
        error:   null,
    },
    removal: {
        topic:   {},
        loading: false,
        error:   null,
    }
}, action) {
    switch (action.type) {
        case FETCH_TOPICS:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true,
                },
            }

        case FETCH_TOPICS_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    items:   action.topics,
                    loading: false,
                    stale:   false,
                },
            }

        case FETCH_TOPICS_FAILURE:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    stale:   false,
                },
            }

        case INVALIDATE_TOPICS:
            return {
                ...state,
                list: {
                    ...state.list,
                    stale: true,
                },
            }

        case DELETE_TOPIC_SUCCESS:
            return {
                ...state,
                byId: _.omit(state.byId, action.topicId),
                list: {
                    ...state.list,
                    items: state.list.items.filter(topic => topic.id !== action.topicId),
                }
            }


        case FETCH_TOPIC:
        case FETCH_TOPIC_SUCCESS:
        case FETCH_TOPIC_ERROR:
        case INVALIDATE_TOPIC:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.topicId]: topic(state.byId[action.topicId], action),
                }
            }

        case TOPIC_SUBSCRIPTION_SUCCESS:
        case TOPIC_UNSUBSCRIPTION_SUCCESS:
            let topicsById = state.byId
            if (topicsById[action.topicId]) {
                topicsById = {
                    ...topicsById,
                    [action.topicId]: topic(topicsById[action.topicId], action),
                }
            }

            return {
                ...state,
                list: {
                    ...state.list,
                    items: state.list.items.map(topic => {
                        if (topic.id === action.topicId) {
                            return {
                                ...topic,
                                subscribed: action.type === TOPIC_SUBSCRIPTION_SUCCESS,
                            }
                        }

                        return topic
                    })
                },
                byId: topicsById,
            }

        default:
            return state
    }
}
