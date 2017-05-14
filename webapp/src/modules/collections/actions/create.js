import Joi                       from 'joi-browser'

import history                   from '../../../core/history'
import { create }                from '../api'
import schema                    from '../schemas/collectionSchema'
import { invalidateCollections } from './index'
import * as media                from '../../media/api'


export const CREATE_COLLECTION_REQUEST = 'CREATE_COLLECTION_REQUEST'
export const CREATE_COLLECTION_SUCCESS = 'CREATE_COLLECTION_SUCCESS'
export const CREATE_COLLECTION_FAILURE = 'CREATE_COLLECTION_FAILURE'
export const CREATE_COLLECTION_RESET   = 'CREATE_COLLECTION_RESET'

export const createCollection = _data => (dispatch, getState) => {
    console.log(_data)

    const { value: data } = Joi.validate(_data, schema)

    dispatch({ type: CREATE_COLLECTION_REQUEST, data })

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
            dispatch({ type: CREATE_COLLECTION_SUCCESS })
            dispatch(invalidateCollections())
            history.push('/collections')
        })
        .catch(error => {
            dispatch({ type: CREATE_COLLECTION_FAILURE, error })
        })
}

export const resetCreateCollection = () => ({ type: CREATE_COLLECTION_RESET })
