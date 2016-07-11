import React, { Component, PropTypes } from 'react'


class FormErrors extends Component {
    render() {
        const { errors } = this.props

        if (errors.length === 0) {
            return null
        }

        return (
            <ul>
                {errors.map(error => (
                    <li key={`${error.path}.${error.type}`}>
                        {error.message}
                    </li>
                ))}
            </ul>
        )
    }
}

FormErrors.propTypes = {
    errors: PropTypes.array.isRequired,
}


export default FormErrors
