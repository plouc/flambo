import Joi         from 'joi-browser'

import { comment } from '../api'
import schema      from '../../comments/schemas/commentSchema'
import {
    fetchCollectionComments,
} from './index'


export const CREATE_COLLECTION_COMMENT_REQUEST = 'CREATE_COLLECTION_COMMENT_REQUEST'
export const CREATE_COLLECTION_COMMENT_SUCCESS = 'CREATE_COLLECTION_COMMENT_SUCCESS'
export const CREATE_COLLECTION_COMMENT_FAILURE = 'CREATE_COLLECTION_COMMENT_FAILURE'
export const CREATE_COLLECTION_COMMENT_RESET   = 'CREATE_COLLECTION_COMMENT_RESET'

export const createCollectionComment = (id, _data) => (dispatch, getState) => {
    const { value: data } = Joi.validate(_data, schema)

    dispatch({ type: CREATE_COLLECTION_COMMENT_REQUEST, data })

    const { auth: { token } } = getState()

    return comment(token, id, data)
        .then(() => {
            dispatch({ type: CREATE_COLLECTION_COMMENT_SUCCESS })
            dispatch(fetchCollectionComments(id))
        })
        .catch(error => {
            dispatch({
                type: CREATE_COLLECTION_COMMENT_FAILURE,
                error,
            })
        })
}

export const resetCreateCollectionComment = () => ({ type: CREATE_COLLECTION_COMMENT_RESET })
