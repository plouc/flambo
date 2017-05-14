import Joi from 'joi-browser'
import _   from 'lodash'

const defaultOptions = {
    abortEarly: false,      // returns all errors
    presence:   'optional',
}

/**
 * Returns a validator which maps errors to form fields using Joi error path property,
 * used to be able to display errors on forms managed by redux-form.
 *
 * @example
 * import { reduxForm } from 'redux-form'
 * import validate      from './core/validate'
 *
 * class EntityForm {
 *     // ...
 * }
 *
 * export default reduxForm({
 *     form:     'entity',
 *     validate: validate(entitySchema),
 * })(EntityForm)
 *
 *
 * @param {Object} schema   - The Joi schema
 * @param {Object} _options - Joi options
 * @returns {function(*=)}
 */
const validate = (schema, _options = {}) => {
    if (schema.isJoi !== true) {
        throw new TypeError(`"schema" must be a valid Joi schema`)
    }

    const options = Object.assign({}, defaultOptions, _options)

    return values => {
        const errors = {}

        const { error } = Joi.validate(values, schema, options)
        if (error) {
            error.details.forEach(e => {
                let field = e.path
                _.set(errors, field, e.message)
            })
        }

        return errors
    }
}

export default validate
