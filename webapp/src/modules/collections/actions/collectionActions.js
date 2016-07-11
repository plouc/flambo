/**
 * @module collections/actions/CollectionActions
 */
'use strict'

import { hashHistory }        from 'react-router'
import * as CollectionsApi    from '../api/CollectionsApi'
import newsItemsActionFactory from '../../../lib/itemNewsItemsActionFactory'
import {
    invalidateCollections,
    fetchCollectionsIfNeeded,
} from './collectionsActions'
import {
    REQUEST_COLLECTION,
    RECEIVE_COLLECTION,
    COLLECTION_FETCH_ERROR,
    INVALIDATE_COLLECTION,
    REQUEST_COLLECTION_NEWS_ITEM_ADDITION,
    REQUEST_COLLECTION_NEWS_ITEM_REMOVAL,
    REQUEST_COLLECTION_NEWS_ITEMS,
    RECEIVE_COLLECTION_NEWS_ITEMS,
} from '../constants/collectionsActionTypes'


const requestCollection = collectionId => ({
    type: REQUEST_COLLECTION,
    collectionId,
})

const receiveCollection = collection => ({
    type:         RECEIVE_COLLECTION,
    collectionId: collection.id,
    collection,
})

const collectionFetchError = (collectionId, status) => ({
    type: COLLECTION_FETCH_ERROR,
    collectionId,
    status,
})

const fetchCollection = id => dispatch => {
    dispatch(requestCollection(id))

    CollectionsApi.get(id)
        .then(collection => {
            dispatch(receiveCollection(collection))
        })
        .catch(err => {
            let status = parseInt(err.message, 10)
            if (err.message === 'Failed to fetch') {
                status = 500
            }
            dispatch(collectionFetchError(id, status))
        })
}

/**
 * Check if a collection should be fetched.
 *
 * @param {Object} state - Current state
 * @param {string} id    - The collection id
 * @returns {boolean}
 */
const shouldFetchCollection = ({ collectionById }, id) => {
    const collection = collectionById[id]

    if (!collection) {
        return true
    } else if (collection.isFetching) {
        return false
    } else {
        return collection.didInvalidate
    }
}

/**
 * Fetch a collection by its id if it does not exist
 * in current state or have been invalidated.
 *
 * @param {string} id - The collection id
 * @returns {null|function}
 */
export function fetchCollectionIfNeeded(id) {
    return (dispatch, getState) => {
        if (shouldFetchCollection(getState(), id)) {
            return dispatch(fetchCollection(id))
        }
    }
}

export const invalidateCollection = collectionId => ({
    type: INVALIDATE_COLLECTION,
    collectionId,
})

const requestCollectionNewsItemAddition = (collectionId, newsItemId) => ({
    type: REQUEST_COLLECTION_NEWS_ITEM_ADDITION,
    collectionId,
    newsItemId,
})

export function addNewsItemToCollection(id, newsItemId) {
    return dispatch => {
        dispatch(requestCollectionNewsItemAddition(id, newsItemId))

        CollectionsApi.addNewsItem(id, newsItemId)
            .then(() => {
                dispatch(invalidateCollection(id))
                dispatch(invalidateCollections())
                dispatch(fetchCollectionsIfNeeded())
            })
    }
}

const requestCollectionNewsItemRemoval = (collectionId, newsItemId) => ({
    type: REQUEST_COLLECTION_NEWS_ITEM_REMOVAL,
    collectionId,
    newsItemId,
})

export function removeNewsItemFromCollection(id, newsItemId) {
    return dispatch => {
        dispatch(requestCollectionNewsItemRemoval(id, newsItemId))

        CollectionsApi.removeNewsItem(id, newsItemId)
            .then(() => {
                dispatch(invalidateCollection(id))
                dispatch(invalidateCollections())
                dispatch(fetchCollectionsIfNeeded())
            })
    }
}

/**
 * Creates actions to fetch source news items for given id.
 */
export const fetchCollectionNewsItems = newsItemsActionFactory(
    REQUEST_COLLECTION_NEWS_ITEMS,
    RECEIVE_COLLECTION_NEWS_ITEMS,
    'collectionId',
    CollectionsApi.getCollectionNewsItems
)