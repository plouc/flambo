import createCreateReducer from '../../../core/reducers/createCreateReducer'
import * as actions        from '../actions'


export default createCreateReducer({
    actionTypes: {
        request: actions.CREATE_COLLECTION_COMMENT_REQUEST,
        success: actions.CREATE_COLLECTION_COMMENT_SUCCESS,
        failure: actions.CREATE_COLLECTION_COMMENT_FAILURE,
        reset:   actions.CREATE_COLLECTION_COMMENT_RESET,
    },
})
