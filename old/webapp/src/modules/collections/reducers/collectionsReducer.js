/**
 * @module collections/reducers/CollectionsReducer
 */
'use strict'

import { FETCH_STATUS_OK } from '../../core/constants/fetchStatuses'
import { LOGOUT_SUCCESS }  from '../../auth/actions/authActions'
import {
    REQUEST_COLLECTIONS,
    RECEIVE_COLLECTIONS,
    REQUEST_COLLECTION_NEWS_ITEM_ADDITION,
    REQUEST_COLLECTION_NEWS_ITEM_REMOVAL,
    COLLECTIONS_FETCH_ERROR,
    INVALIDATE_COLLECTIONS,
} from '../constants/collectionsActionTypes'


export default function collections(state = {
    collections:   [],
    isFetching:    false,
    didInvalidate: true,
    status:        FETCH_STATUS_OK,
}, action) {
    switch (action.type) {
        case REQUEST_COLLECTIONS:
            return {
                ...state,
                isFetching: true,
            }

        case RECEIVE_COLLECTIONS:
            return {
                ...state,
                collections:   action.collections,
                status:        FETCH_STATUS_OK,
                isFetching:    false,
                didInvalidate: false,
            }

        case REQUEST_COLLECTION_NEWS_ITEM_ADDITION:
            return {
                ...state,
                collections: state.collections.map(collection => {
                    if (collection.id === action.collectionId) {
                        return {
                            ...collection,
                            news_items: collection.news_items.concat(action.newsItemId),
                        }
                    }

                    return collection
                })
            }

        case REQUEST_COLLECTION_NEWS_ITEM_REMOVAL:
            return {
                ...state,
                collections: state.collections.map(collection => {
                    if (collection.id === action.collectionId) {
                        return {
                            ...collection,
                            news_items: collection.news_items.filter(id => id !== action.newsItemId),
                        }
                    }

                    return collection
                })
            }


        case INVALIDATE_COLLECTIONS:
            return {
                ...state,
                didInvalidate: true,
            }

        case COLLECTIONS_FETCH_ERROR:
            return {
                ...state,
                status:        action.status,
                isFetching:    false,
                didInvalidate: false,
            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                collections:   [],
                didInvalidate: true,
            }

        default:
            return state
    }
}
