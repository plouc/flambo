/**
 * @module auth/api/AuthApi
 */
'use strict'

const BASE_URL = 'http://localhost:3000/api/v1'


export const login = credentials => {
    let res

    return fetch(`${BASE_URL}/users/token`, {
        method:  'POST',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })
    .then(_res => {
        res = _res

        return res.json()
    })
    .then(
        data => {
            if (res.status === 400) {
                const errors = {}
                data.errors.forEach(error => {
                    errors[error.path] = error.message
                })

                return Promise.reject(errors)
            }

            return data.token
        },
        error => {
            if (res.status === 401) {
                return Promise.reject({ _error: 'Unable to authenticate' })
            }

            throw error
        }
    )
}
