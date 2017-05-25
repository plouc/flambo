import {
    apiBaseUrl,
    checkApiResponse,
    apiPost,
    apiPut,
    apiDelete,
} from '../../core/api'


const endpoint = `${apiBaseUrl}/collections`

export const update = (token, id, data) => {
    return apiPut(`${endpoint}/${id}`, { token, data })
        .then(checkApiResponse({ id, entity: 'collection' }))
}

export const subscribe = (token, id) => {
    return apiPost(`${endpoint}/${id}/subscription`, { token })
        .then(checkApiResponse())
}

export const unsubscribe = (token, id) => {
    return apiDelete(`${endpoint}/${id}/subscription`, { token })
        .then(checkApiResponse())
}

export const comment = (token, id, data) => {
    const commentsEndpoint = `${endpoint}/${id}/comments`

    return apiPost(commentsEndpoint, { token, data })
        .then(checkApiResponse())
}
