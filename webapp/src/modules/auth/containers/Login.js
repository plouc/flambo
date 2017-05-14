import { connect }      from 'react-redux'
import { reduxForm }    from 'redux-form'

import validate         from '../../../core/validate'
import Login            from '../components/Login'
import validationSchema from '../schemas/loginSchema'
import { login }        from '../actions'

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
    onSubmit: credentials => {
        dispatch(login(credentials))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form:     'login',
    validate: validate(validationSchema),
})(Login))
