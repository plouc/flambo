import { fetchTime } from '../../../core/actions/actionsHelpers'
import { jobs }      from '../api'


export const FETCH_SOURCE_JOBS_REQUEST = 'FETCH_SOURCE_JOBS_REQUEST'
export const FETCH_SOURCE_JOBS_SUCCESS = 'FETCH_SOURCE_JOBS_SUCCESS'
export const FETCH_SOURCE_JOBS_FAILURE = 'FETCH_SOURCE_JOBS_FAILURE'
export const INVALIDATE_SOURCE_JOBS    = 'INVALIDATE_SOURCE_JOBS'

export const fetchSourceJobs = (id, _options = {}) => (dispatch, getState) => {
    const {
        collections: { perPage, page, sort, filters },
        auth:        { token },
    } = getState()

    const options = {
        perPage,
        page,
        sort,
        filters,
        ..._options,
    }

    dispatch({ type: FETCH_SOURCE_JOBS_REQUEST, id, ...options })

    return jobs(token, id, options)
        .then(res => {
            dispatch(fetchTime({
                type: FETCH_SOURCE_JOBS_SUCCESS,
                id,
                ...res,
            }))
        })
        .catch(error => {
            dispatch({
                type: FETCH_SOURCE_JOBS_FAILURE,
                id,
                error,
            })
        })
}

export const invalidateSourceJobs = id => ({ type: INVALIDATE_SOURCE_JOBS, id })
