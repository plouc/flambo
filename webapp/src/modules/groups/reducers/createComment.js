import createCreateReducer from '../../../core/reducers/createCreateReducer'
import * as actions        from '../actions'


export default createCreateReducer({
    actionTypes: {
        request: actions.CREATE_GROUP_COMMENT_REQUEST,
        success: actions.CREATE_GROUP_COMMENT_SUCCESS,
        failure: actions.CREATE_GROUP_COMMENT_FAILURE,
        reset:   actions.CREATE_GROUP_COMMENT_RESET,
    },
})
