import {
    apiBaseUrl,
    checkApiResponse,
    apiPost,
    apiPut,
    apiDelete,
} from '../../core/api'


const endpoint = `${apiBaseUrl}/groups`

export const create = (token, data) => {
    return apiPost(endpoint, { token, data })
        .then(checkApiResponse({ entity: 'group' }))
}

export const update = (token, id, data) => {
    return apiPut(`${endpoint}/${id}`, { token, data })
        .then(checkApiResponse({ id, entity: 'group' }))
}

export const join = (token, id) => {
    return apiPost(`${endpoint}/${id}/membership`, { token })
        .then(checkApiResponse())
}

export const leave = (token, id) => {
    return apiDelete(`${endpoint}/${id}/membership`, { token })
        .then(checkApiResponse())
}

export const comment = (token, id, data) => {
    const commentsEndpoint = `${endpoint}/${id}/comments`

    return apiPost(commentsEndpoint, { token, data })
        .then(checkApiResponse())
}
