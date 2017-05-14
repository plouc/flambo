import {
    apiBaseUrl,
    checkApiResponse,
    apiPost,
} from '../../core/api'


const endpoint = `${apiBaseUrl}/login`

export const login = data => {
    return apiPost(endpoint, { data })
        .then(checkApiResponse())
}
