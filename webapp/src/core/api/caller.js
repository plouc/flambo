const call = method => (url, { token, ...options } = {}) => {
    const headers = new Headers()

    headers.append('Accept',       'application/json')
    headers.append('Content-Type', 'application/json')
    if (token !== undefined) {
        headers.append('Authorization', `Bearer ${token}`)
    }

    options = { headers, method, ...options }

    return fetch(url, options)
}

const send = method => (url, { data, ...options } = {}) => {
    return call(method)(url, {
        ...options,
        body: JSON.stringify(data),
    })
}

//export const apiGet = (url, options) => new Promise(resolve => {
//    setTimeout(() => resolve(call('GET')(url, options)), 1200)
//})

export const apiGet = call('GET')

export const apiPost = send('POST')

export const apiPut = send('PUT')

export const apiDelete = call('DELETE')