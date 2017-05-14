import createUpdateReducer from '../../../core/reducers/createUpdateReducer'
import * as actions        from '../actions'


export default createUpdateReducer({
    actionTypes: {
        request: actions.UPDATE_GROUP_REQUEST,
        success: actions.UPDATE_GROUP_SUCCESS,
        failure: actions.UPDATE_GROUP_FAILURE,
        reset:   actions.UPDATE_GROUP_RESET,
    },
})
