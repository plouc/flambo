import { initialize }             from 'redux-form'
import Joi                        from 'joi-browser'

import history                    from '../../../core/history'
import { create }                 from '../api'
import schema                     from '../schemas/sourceSchema'
import { invalidateSources }      from './sourcesActions'
import { FORM_NAME }              from '../constants'


export const CREATE_SOURCE_REQUEST = 'CREATE_SOURCE_REQUEST'
export const CREATE_SOURCE_SUCCESS = 'CREATE_SOURCE_SUCCESS'
export const CREATE_SOURCE_FAILURE = 'CREATE_SOURCE_FAILURE'
export const CREATE_SOURCE_RESET   = 'CREATE_SOURCE_RESET'

export const createSource = _data => dispatch => {
    const { value: data } = Joi.validate(_data, schema)

    dispatch({ type: CREATE_SOURCE_REQUEST, data })

    return create(data)
        .then(() => {
            dispatch({ type: CREATE_SOURCE_SUCCESS })
            //dispatch(initialize(FORM_NAME, {}))
            dispatch(invalidateSources())
            //dispatch(notifySuccess({
            //    message:       'position_successful_creation',
            //    messageValues: { position: data.name },
            //}))
            history.push('/sources')
        })
        .catch(error => {
            dispatch({
                type: CREATE_SOURCE_FAILURE,
                error,
            })
        })
}

export const resetCreateSource = () => ({ type: CREATE_SOURCE_RESET })
