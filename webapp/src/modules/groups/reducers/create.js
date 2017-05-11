import createCreateReducer from '../../../core/reducers/createCreateReducer'
import {
    CREATE_GROUP_REQUEST,
    CREATE_GROUP_SUCCESS,
    CREATE_GROUP_FAILURE,
    CREATE_GROUP_RESET,
} from '../actions'


export default createCreateReducer({
    actionTypes: {
        request: CREATE_GROUP_REQUEST,
        success: CREATE_GROUP_SUCCESS,
        failure: CREATE_GROUP_FAILURE,
        reset:   CREATE_GROUP_RESET,
    },
})
