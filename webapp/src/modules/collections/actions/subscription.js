import { subscribe, unsubscribe } from '../api'
import {
    fetchCollectionSubscribers,
    invalidateCollection,
    fetchCollectionIfNeeded,
} from './index'


export const COLLECTION_SUBSCRIBE_REQUEST   = 'COLLECTION_SUBSCRIBE_REQUEST'
export const COLLECTION_SUBSCRIBE_SUCCESS   = 'COLLECTION_SUBSCRIBE_SUCCESS'
export const COLLECTION_SUBSCRIBE_FAILURE   = 'COLLECTION_SUBSCRIBE_FAILURE'

export const COLLECTION_UNSUBSCRIBE_REQUEST = 'COLLECTION_UNSUBSCRIBE_REQUEST'
export const COLLECTION_UNSUBSCRIBE_SUCCESS = 'COLLECTION_UNSUBSCRIBE_SUCCESS'
export const COLLECTION_UNSUBSCRIBE_FAILURE = 'COLLECTION_UNSUBSCRIBE_FAILURE'

export const subscribeToCollection = ({ id }) => (dispatch, getState) => {
    dispatch({ type: COLLECTION_SUBSCRIBE_REQUEST, id })

    const { auth: { token } } = getState()

    return subscribe(token, id)
        .then(() => {
            dispatch({ type: COLLECTION_SUBSCRIBE_SUCCESS, id })
            dispatch(invalidateCollection(id))
            dispatch(fetchCollectionIfNeeded(id))
            dispatch(fetchCollectionSubscribers(id))
        })
        .catch(error => {
            dispatch({ type: COLLECTION_SUBSCRIBE_FAILURE, id, error })
        })
}

export const unsubscribeFromCollection = ({ id }) => (dispatch, getState) => {
    dispatch({ type: COLLECTION_UNSUBSCRIBE_REQUEST, id })

    const { auth: { token } } = getState()

    return unsubscribe(token, id)
        .then(() => {
            dispatch({ type: COLLECTION_UNSUBSCRIBE_SUCCESS, id })
            dispatch(fetchCollectionSubscribers(id))
            dispatch(invalidateCollection(id))
            dispatch(fetchCollectionIfNeeded(id))
            dispatch(fetchCollectionSubscribers(id))
        })
        .catch(error => {
            dispatch({ type: COLLECTION_UNSUBSCRIBE_FAILURE, id, error })
        })
}
