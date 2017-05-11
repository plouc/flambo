/**
 * An error
 *
 * @param {string} name      - Error name
 * @param {string} [message] - an optional message
 * @param {*} [data]         - optional data to pass along with the error
 * @returns {Error} The extended error
 */
module.exports = (
    name    = 'UNDEFINED_ERROR',
    message = 'UNDEFINED_ERROR',
    data
) => {
    const error = new Error(message)
    error.name = name

    if (data) error.data = data

    return error
}