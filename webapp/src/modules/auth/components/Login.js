'use strict'

import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import FormFieldError                  from '../../core/components/FormFieldError'
import ButtonWithLoader                from '../../core/components/ButtonWithLoader'



export default class Login extends Component {
    render() {
        const {
            fields: { email, password },
            handleSubmit,
            submitting,
            error,
        } = this.props

        return (
            <div className="login">
                <form className="login__form" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div className="f-form__row">
                        <input
                            className="form-control form-control--full"
                            type="text"
                            placeholder="Username"
                            {...email}
                        />
                        <FormFieldError {...email} />
                    </div>
                    <div className="f-form__row">
                        <input
                            className="form-control form-control--full"
                            type="password"
                            placeholder="Password"
                            {...password}
                        />
                        <FormFieldError {...password} />
                    </div>
                    {error && (
                        <div>{error}</div>
                    )}
                    <div>
                        <ButtonWithLoader
                            elementType="button"
                            type="submit"
                            loading={submitting}
                            className="button--action button--full"
                            transition="slide-down"
                            label="login"
                        />
                    </div>
                </form>
            </div>
        )
    }
}

Login.propTypes = {
    fields:         PropTypes.shape({
        email:    PropTypes.object.isRequired,
        password: PropTypes.object.isRequired,
    }).isRequired,
    handleSubmit:   PropTypes.func.isRequired,
    submitting:     PropTypes.bool.isRequired,
}


export default Login
