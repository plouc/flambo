import createCreateReducer from '../../../core/reducers/createCreateReducer'
import * as actions        from '../actions'


export default createCreateReducer({
    actionTypes: {
        request: actions.CREATE_GROUP_REQUEST,
        success: actions.CREATE_GROUP_SUCCESS,
        failure: actions.CREATE_GROUP_FAILURE,
        reset:   actions.CREATE_GROUP_RESET,
    },
})
