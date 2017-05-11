import createCreateReducer from '../../../core/reducers/createCreateReducer'
import * as actions        from '../actions'


export default createCreateReducer({
    actionTypes: {
        request: actions.CREATE_SOURCE_REQUEST,
        success: actions.CREATE_SOURCE_SUCCESS,
        failure: actions.CREATE_SOURCE_FAILURE,
        reset:   actions.CREATE_SOURCE_RESET,
    },
})
