import {
    apiBaseUrl,
    checkApiResponse,
} from '../../core/api'


const endpoint = `${apiBaseUrl}/media`

export const upload = (token, file) => {
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${token}`)

    const body = new FormData()
    body.append('file', file)

    return fetch(`${endpoint}/upload`, {
        method: 'POST',
        headers,
        body,
    })
        .then(checkApiResponse())
}
