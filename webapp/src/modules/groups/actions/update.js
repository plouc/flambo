import Joi               from 'joi-browser'

import history           from '../../../core/history'
import * as api          from '../api'
import schema            from '../schemas/sourceSchema'
import {
    invalidateSource,
    invalidateSources,
    fetchSourceIfNeeded,
} from './index'

export const UPDATE_SOURCE_REQUEST = 'UPDATE_SOURCE_REQUEST'
export const UPDATE_SOURCE_SUCCESS = 'UPDATE_SOURCE_SUCCESS'
export const UPDATE_SOURCE_FAILURE = 'UPDATE_SOURCE_FAILURE'
export const UPDATE_SOURCE_RESET   = 'UPDATE_SOURCE_RESET'

export const resetUpdateSource = () => ({ type: UPDATE_SOURCE_RESET })

export const updateSource = (id, _data) => dispatch => {
    const { value: data } = Joi.validate(_data, schema)

    dispatch({ type: UPDATE_SOURCE_REQUEST, id, data })

    return api.update(id, data)
        .then(() => {
            dispatch({ type: UPDATE_SOURCE_SUCCESS, id })
            dispatch(resetUpdateSource())
            dispatch(invalidateSource(id))
            dispatch(fetchSourceIfNeeded(id))
            dispatch(invalidateSources())
            //dispatch(notifySuccess({
            //    message: 'contract_successful_update',
            //}))
            history.push(`/sources/${id}`)
        })
        .catch(error => {
            dispatch({ type: UPDATE_SOURCE_FAILURE, id, error })
        })
}
