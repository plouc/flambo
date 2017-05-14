import { connect }                      from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { injectIntl }                   from 'react-intl'
import { withTheme }                    from 'styled-components'

import validate                         from '../../validate'


export default ({
    formName,
    validationSchema,
    pickFormValues = [],
    injectTheme    = false,
}) => FormComponent => {
    let form = FormComponent

    if (pickFormValues.length > 0) {
        const boundFormValueSelector = formValueSelector(formName)
        const mapStateToProps        = state => ({
            formValues: boundFormValueSelector(state, ...pickFormValues),
        })

        form = connect(mapStateToProps)(form)
    }

    if (injectTheme === true) {
        form = withTheme(form)
    }

    const formOptions = { form: formName }
    if (validationSchema) {
        formOptions.validate = validate(validationSchema, { allowUnknown: true })
    }

    return reduxForm(formOptions)(injectIntl(form))
}
