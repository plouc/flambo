import createListReducer from '../../../core/reducers/createListReducer'
import {
    FETCH_COLLECTIONS_REQUEST,
    FETCH_COLLECTIONS_SUCCESS,
    FETCH_COLLECTIONS_FAILURE,
    INVALIDATE_COLLECTIONS,
    FETCH_COLLECTION_REQUEST,
    FETCH_COLLECTION_SUCCESS,
    FETCH_COLLECTION_FAILURE,
    INVALIDATE_COLLECTION,
} from '../actions'


export default createListReducer({
    actionTypes: {
        request:        FETCH_COLLECTIONS_REQUEST,
        success:        FETCH_COLLECTIONS_SUCCESS,
        failure:        FETCH_COLLECTIONS_FAILURE,
        invalidate:     INVALIDATE_COLLECTIONS,
        requestItem:    FETCH_COLLECTION_REQUEST,
        successItem:    FETCH_COLLECTION_SUCCESS,
        failureItem:    FETCH_COLLECTION_FAILURE,
        invalidateItem: INVALIDATE_COLLECTION,
    },
    defaultFilters: {},
})
