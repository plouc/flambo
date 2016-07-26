'use strict'

import React, { PropTypes } from 'react'


const FormFieldError = ({ touched, error }) => {
    if (!touched || !error) {
        return null
    }

    return (
        <div className="f-form__error">
            {error}
        </div>
    )
}

FormFieldError.propTypes = {
    touched: PropTypes.bool.isRequired,
    error:   PropTypes.string,
}


export default FormFieldError
