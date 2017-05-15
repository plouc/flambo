export const UNDEFINED_ERROR           = 'UNDEFINED_ERROR'
export const ENTITY_NOT_FOUND          = 'ENTITY_NOT_FOUND'
export const INTERNAL_SERVER_ERROR     = 'INTERNAL_SERVER_ERROR'
export const SERVICE_UNAVAILABLE_ERROR = 'SERVICE_UNAVAILABLE_ERROR'
export const VALIDATION_ERROR          = 'VALIDATION_ERROR'
export const UNAUTHORIZED_ERROR        = 'UNAUTHORIZED_ERROR'

export const namedError                = (name = UNDEFINED_ERROR, message, data = {}) => {
    console.log(name, message, data)

    const error = new Error(message || name)
    error.name = name
    error.data = data

    return error
}

export const isNotFoundError           = error => error.name === ENTITY_NOT_FOUND
export const isValidationError         = error => error.name === VALIDATION_ERROR
export const isInternalServerError     = error => error.name === INTERNAL_SERVER_ERROR
export const isServiceUnavailableError = error => error.name === SERVICE_UNAVAILABLE_ERROR
export const isUnauthorizedError       = error => error.name === UNAUTHORIZED_ERROR

export const isNamedError              = error => {
    return [
        ENTITY_NOT_FOUND,
        INTERNAL_SERVER_ERROR,
        SERVICE_UNAVAILABLE_ERROR,
        VALIDATION_ERROR,
        UNAUTHORIZED_ERROR,
    ].includes(error.name)
}