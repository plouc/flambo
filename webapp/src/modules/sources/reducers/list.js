import createListReducer from '../../../core/reducers/createListReducer'
import * as actions      from '../actions'


export default createListReducer({
    actionTypes: {
        request:        actions.FETCH_SOURCES_REQUEST,
        success:        actions.FETCH_SOURCES_SUCCESS,
        failure:        actions.FETCH_SOURCES_FAILURE,
        invalidate:     actions.INVALIDATE_SOURCES,
        requestItem:    actions.FETCH_SOURCE_REQUEST,
        successItem:    actions.FETCH_SOURCE_SUCCESS,
        failureItem:    actions.FETCH_SOURCE_FAILURE,
        invalidateItem: actions.INVALIDATE_SOURCE,
    },
    defaultFilters: {},
})
