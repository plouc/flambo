import Joi        from 'joi-browser'

import history    from '../../../core/history'
import { update } from '../api'
import schema     from '../schemas/collectionSchema'


export const UPDATE_COLLECTION_REQUEST = 'UPDATE_COLLECTION_REQUEST'
export const UPDATE_COLLECTION_SUCCESS = 'UPDATE_COLLECTION_SUCCESS'
export const UPDATE_COLLECTION_FAILURE = 'UPDATE_COLLECTION_FAILURE'
export const UPDATE_COLLECTION_RESET   = 'UPDATE_COLLECTION_RESET'

export const resetUpdateCollection = () => ({ type: UPDATE_COLLECTION_RESET })

export const updateCollection = (id, _data) => (dispatch, getState) => {
    const { value: data } = Joi.validate(_data, schema)

    dispatch({ type: UPDATE_COLLECTION_REQUEST, id, data })

    const { auth: { token } } = getState()

    return update(token, id, data)
        .then(() => {
            dispatch({ type: UPDATE_COLLECTION_SUCCESS, id })
            dispatch(resetUpdateCollection())
            history.push(`/collections/${id}`)
        })
        .catch(error => {
            dispatch({ type: UPDATE_COLLECTION_FAILURE, id, error })
        })
}
