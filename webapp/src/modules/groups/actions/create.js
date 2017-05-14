import Joi                  from 'joi-browser'

import history              from '../../../core/history'
import { create }           from '../api'
import schema               from '../schemas/groupSchema'
import { invalidateGroups } from './index'
import * as media           from '../../media/api'


export const CREATE_GROUP_REQUEST = 'CREATE_GROUP_REQUEST'
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS'
export const CREATE_GROUP_FAILURE = 'CREATE_GROUP_FAILURE'
export const CREATE_GROUP_RESET   = 'CREATE_GROUP_RESET'

export const createGroup = _data => (dispatch, getState) => {
    console.log(_data)

    const { value: data } = Joi.validate(_data, schema)

    dispatch({ type: CREATE_GROUP_REQUEST, data })

    const { auth: { token } } = getState()

    return Promise.resolve()
        .then(() => {
            if (_data.picture && _data.picture.length === 1) {
                return media.upload(token, _data.picture[0])
            }
        })
        .then(medium => {
            if (medium) return create(token, { ...data, picture_id: medium.id })
            return create(token, data)
        })
        .then(() => {
            dispatch({ type: CREATE_GROUP_SUCCESS })
            dispatch(invalidateGroups())
            history.push('/groups')
        })
        .catch(error => {
            dispatch({
                type: CREATE_GROUP_FAILURE,
                error,
            })
        })
}

export const resetCreateGroup = () => ({ type: CREATE_GROUP_RESET })
