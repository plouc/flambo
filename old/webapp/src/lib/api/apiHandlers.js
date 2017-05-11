import { FETCH_STATUS_FAILURE } from '../../modules/core/constants/fetchStatuses'

export const doneHandler = res => {
    if (!res.ok) {
        return Promise.reject(parseInt(res.status, 10))
    }

    return res.json()
}

export const failureHandler = err => Promise.reject(FETCH_STATUS_FAILURE)
