import createListReducer from '../../../core/reducers/createListReducer'
import * as actions      from '../actions'


export default createListReducer({
    actionTypes: {
        request:        actions.FETCH_COLLECTIONS_REQUEST,
        success:        actions.FETCH_COLLECTIONS_SUCCESS,
        failure:        actions.FETCH_COLLECTIONS_FAILURE,
        invalidate:     actions.INVALIDATE_COLLECTIONS,
        requestItem:    actions.FETCH_COLLECTION_REQUEST,
        successItem:    actions.FETCH_COLLECTION_SUCCESS,
        failureItem:    actions.FETCH_COLLECTION_FAILURE,
        invalidateItem: actions.INVALIDATE_COLLECTION,
    },
    defaultFilters: {},
})
