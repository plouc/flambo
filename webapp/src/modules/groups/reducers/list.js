import createListReducer from '../../../core/reducers/createListReducer'
import * as actions      from '../actions'


export default createListReducer({
    actionTypes: {
        request:        actions.FETCH_GROUPS_REQUEST,
        success:        actions.FETCH_GROUPS_SUCCESS,
        failure:        actions.FETCH_GROUPS_FAILURE,
        invalidate:     actions.INVALIDATE_GROUPS,
        requestItem:    actions.FETCH_GROUP_REQUEST,
        successItem:    actions.FETCH_GROUP_SUCCESS,
        failureItem:    actions.FETCH_GROUP_FAILURE,
        invalidateItem: actions.INVALIDATE_GROUP,
    },
    defaultFilters: {},
})
