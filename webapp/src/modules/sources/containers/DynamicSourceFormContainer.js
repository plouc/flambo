'use strict'

import _                 from 'lodash'
import { reduxForm }     from 'redux-form'
import DynamicSourceForm from '../components/DynamicSourceForm'


const mapStateToProps = ({ auth: { token }, locale }, { onSubmit }) => {
    return {
        onSubmit: _.partial(onSubmit, token), // bind jwt token from current state
        locale:   locale.locale,
    }
}

const mapDispatchToProps = dispatch => ({})

export default reduxForm(
    {
        form: 'source',
    },
    mapStateToProps,
    mapDispatchToProps
)(DynamicSourceForm)

