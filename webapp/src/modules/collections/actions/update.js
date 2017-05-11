import Joi        from 'joi-browser'

import history    from '../../../core/history'
import { update } from '../api'
import schema     from '../schemas/groupSchema'
import {
    invalidateGroup,
    invalidateGroups,
    fetchGroupIfNeeded,
} from './index'

export const UPDATE_GROUP_REQUEST = 'UPDATE_GROUP_REQUEST'
export const UPDATE_GROUP_SUCCESS = 'UPDATE_GROUP_SUCCESS'
export const UPDATE_GROUP_FAILURE = 'UPDATE_GROUP_FAILURE'
export const UPDATE_GROUP_RESET   = 'UPDATE_GROUP_RESET'

export const resetUpdateGroup = () => ({ type: UPDATE_GROUP_RESET })

export const updateGroup = (id, _data) => (dispatch, getState) => {
    const { value: data } = Joi.validate(_data, schema)

    dispatch({ type: UPDATE_GROUP_REQUEST, id, data })

    const { auth: { token } } = getState()

    return update(token, id, data)
        .then(() => {
            dispatch({ type: UPDATE_GROUP_SUCCESS, id })
            dispatch(resetUpdateGroup())
            dispatch(invalidateGroup(id))
            dispatch(fetchGroupIfNeeded(id))
            dispatch(invalidateGroups())
            //dispatch(notifySuccess({
            //    message: 'contract_successful_update',
            //}))
            history.push(`/groups/${id}`)
        })
        .catch(error => {
            dispatch({ type: UPDATE_GROUP_FAILURE, id, error })
        })
}
