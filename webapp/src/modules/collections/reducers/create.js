import createCreateReducer from '../../../core/reducers/createCreateReducer'
import * as actions        from '../actions'


export default createCreateReducer({
    actionTypes: {
        request: actions.CREATE_COLLECTION_REQUEST,
        success: actions.CREATE_COLLECTION_SUCCESS,
        failure: actions.CREATE_COLLECTION_FAILURE,
        reset:   actions.CREATE_COLLECTION_RESET,
    },
})
