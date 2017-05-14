import {
    ENTITY_NOT_FOUND,
    INTERNAL_SERVER_ERROR,
    SERVICE_UNAVAILABLE_ERROR,
} from '../errors'

export const mockResponse = (status, statusText, response) => {
    let responseText
    if (response !== undefined) {
        responseText = JSON.stringify(response)
    }

    return new window.Response(responseText, {
        status:     status,
        statusText: statusText,
        headers:    {
            'Content-type': 'application/json',
        },
    })
}

export const testNotFound = (fn, args = [], options = {
    body:         null,
    errorContext: {},
}) => {
    const { body, errorContext } = options

    it('should handle API not found errors', () => {
        window.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve(mockResponse(404, null, body))
        })

        return fn(...args)
            .catch(e => {
                expect(e.name).toBe(ENTITY_NOT_FOUND)
                if (body !== null) {
                    expect(e.data).toEqual({
                        ...errorContext,
                        ...body,
                    })
                }
            })
    })
}

export const testInternalServerError = (fn, args = [], options = {
    body:         null,
    errorContext: {},
}) => {
    const { body, errorContext } = options

    it(`should intercept API internal errors ${body !== null ? 'with' : 'without'} body`, () => {
        window.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve(mockResponse(500, null, body))
        })

        return fn(...args).catch(e => {
            expect(e.name).toBe(INTERNAL_SERVER_ERROR)
            if (body !== null) {
                expect(e.data).toEqual({
                    ...errorContext,
                    ...body,
                })
            }
        })
    })
}

export const testServiceUnavailable = (fn, args = []) => {
    it('should handle unavailable API errors', () => {
        window.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve(mockResponse(503))
        })

        return fn(...args).catch(e => {
            expect(e.name).toBe(SERVICE_UNAVAILABLE_ERROR)
        })
    })
}
