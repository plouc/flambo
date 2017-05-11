import createUpdateReducer from '../../../core/reducers/createUpdateReducer'
import * as actions        from '../actions'


export default createUpdateReducer({
    actionTypes: {
        request: actions.UPDATE_SOURCE_REQUEST,
        success: actions.UPDATE_SOURCE_SUCCESS,
        failure: actions.UPDATE_SOURCE_FAILURE,
        reset:   actions.UPDATE_SOURCE_RESET,
    },
})
