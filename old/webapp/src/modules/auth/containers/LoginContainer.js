'use strict'

import { reduxForm } from 'redux-form'
import Login         from '../components/Login'
import { login }     from '../actions/authActions'


const mapStateToProps = ({ locale: { locale } }) => {
    return {
        locale,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({ })


export default reduxForm(
    {
        form:     'login',
        fields:   ['email', 'password'],
        onSubmit: login,
    },
    mapStateToProps,
    mapDispatchToProps
)(Login)