import { initialize }             from 'redux-form'
import Joi                        from 'joi-browser'

import history                    from '../../../core/history'
import { create }                 from '../api'
import schema                     from '../schemas/groupSchema'
import { invalidateGroups }       from './groupsActions'
import { FORM_NAME }              from '../constants'


export const CREATE_GROUP_REQUEST = 'CREATE_GROUP_REQUEST'
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS'
export const CREATE_GROUP_FAILURE = 'CREATE_GROUP_FAILURE'
export const CREATE_GROUP_RESET   = 'CREATE_GROUP_RESET'

export const createGroup = _data => dispatch => {
    const { value: data } = Joi.validate(_data, schema)

    dispatch({ type: CREATE_GROUP_REQUEST, data })

    return create(data)
        .then(() => {
            dispatch({ type: CREATE_GROUP_SUCCESS })
            //dispatch(initialize(FORM_NAME, {}))
            dispatch(invalidateGroups())
            //dispatch(notifySuccess({
            //    message:       'position_successful_creation',
            //    messageValues: { position: data.name },
            //}))
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
