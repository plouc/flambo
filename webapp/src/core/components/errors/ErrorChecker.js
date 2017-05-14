import React, { Component, PropTypes } from 'react'
import NotFoundError                   from './NotFoundError'
import ValidationError                 from './ValidationError'
import InternalServerError             from './InternalServerError'
import {
    isNotFoundError,
    isValidationError,
    isInternalServerError,
} from '../../errors'

export default class ErrorChecker extends Component {
    static propTypes = {
        error: PropTypes.object,
    }

    render() {
        const { error, ...props } = this.props

        if (!error) {
            return this.props.children || null
        }

        if (isNotFoundError(error)) {
            return <NotFoundError {...props} error={error}/>
        }

        if (isValidationError(error)) {
            return <ValidationError {...props} error={error}/>
        }

        if (isInternalServerError(error)) {
            return <InternalServerError {...props} error={error}/>
        }

        console.error(error)

        return <div>Undefined error</div>
    }
}
