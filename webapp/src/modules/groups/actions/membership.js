import { join, leave } from '../api'
import {
    invalidateGroup,
    fetchGroupIfNeeded,
    fetchGroupMembers,
} from './index'
import {
    invalidateMe,
    fetchMeIfNeeded,
} from '../../users/actions'

export const JOIN_GROUP_REQUEST  = 'JOIN_GROUP_REQUEST'
export const JOIN_GROUP_SUCCESS  = 'JOIN_GROUP_SUCCESS'
export const JOIN_GROUP_FAILURE  = 'JOIN_GROUP_FAILURE'

export const LEAVE_GROUP_REQUEST = 'LEAVE_GROUP_REQUEST'
export const LEAVE_GROUP_SUCCESS = 'LEAVE_GROUP_SUCCESS'
export const LEAVE_GROUP_FAILURE = 'LEAVE_GROUP_FAILURE'

export const joinGroup = ({ id }) => (dispatch, getState) => {
    dispatch({ type: JOIN_GROUP_REQUEST, id })

    const { auth: { token } } = getState()

    return join(token, id)
        .then(() => {
            dispatch({ type: JOIN_GROUP_SUCCESS, id })
            dispatch(invalidateGroup(id))
            dispatch(fetchGroupIfNeeded(id))
            dispatch(invalidateMe())
            dispatch(fetchMeIfNeeded())
            dispatch(fetchGroupMembers(id))
        })
        .catch(error => {
            dispatch({ type: JOIN_GROUP_FAILURE, id, error })
        })
}

export const leaveGroup = ({ id }) => (dispatch, getState) => {
    dispatch({ type: LEAVE_GROUP_REQUEST, id })

    const { auth: { token } } = getState()

    return leave(token, id)
        .then(() => {
            dispatch({ type: LEAVE_GROUP_SUCCESS, id })
            dispatch(invalidateGroup(id))
            dispatch(fetchGroupIfNeeded(id))
            dispatch(invalidateMe())
            dispatch(fetchMeIfNeeded())
            dispatch(fetchGroupMembers(id))
        })
        .catch(error => {
            dispatch({ type: LEAVE_GROUP_FAILURE, id, error })
        })
}

