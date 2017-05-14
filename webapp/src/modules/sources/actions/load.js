import { load } from '../api'


export const LOAD_SOURCE_REQUEST = 'LOAD_SOURCE_REQUEST'
export const LOAD_SOURCE_SUCCESS = 'LOAD_SOURCE_SUCCESS'
export const LOAD_SOURCE_FAILURE = 'LOAD_SOURCE_FAILURE'

export const loadSource = id => (dispatch, getState) => {
    dispatch({ type: LOAD_SOURCE_REQUEST, id })

    const { auth: { token } } = getState()

    return load(token, id)
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            dispatch({ type: LOAD_SOURCE_FAILURE, id, error })
        })
}
