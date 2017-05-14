import Joi         from 'joi-browser'

import { comment } from '../api'
import schema      from '../../comments/schemas/commentSchema'
import {
    fetchGroupComments,
} from './index'


export const CREATE_GROUP_COMMENT_REQUEST = 'CREATE_GROUP_COMMENT_REQUEST'
export const CREATE_GROUP_COMMENT_SUCCESS = 'CREATE_GROUP_COMMENT_SUCCESS'
export const CREATE_GROUP_COMMENT_FAILURE = 'CREATE_GROUP_COMMENT_FAILURE'
export const CREATE_GROUP_COMMENT_RESET   = 'CREATE_GROUP_COMMENT_RESET'

export const createGroupComment = (id, _data) => (dispatch, getState) => {
    const { value: data } = Joi.validate(_data, schema)

    dispatch({ type: CREATE_GROUP_COMMENT_REQUEST, data })

    const { auth: { token } } = getState()

    return comment(token, id, data)
        .then(() => {
            dispatch({ type: CREATE_GROUP_COMMENT_SUCCESS })
            dispatch(fetchGroupComments(id))
        })
        .catch(error => {
            dispatch({
                type: CREATE_GROUP_COMMENT_FAILURE,
                error,
            })
        })
}

export const resetCreateGroupComment = () => ({ type: CREATE_GROUP_COMMENT_RESET })
