import { connect }                      from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { injectIntl }                   from 'react-intl'
import { withTheme }                    from 'styled-components'

import validate                         from '../../../core/validate'
import Form                             from '../components/SourceForm'
import schema                           from '../schemas/sourceSchema'
import { FORM_NAME }                    from '../constants'


const boundFormValueSelector = formValueSelector(FORM_NAME)

const mapStateToProps = state => ({
    formValues: {
        type: boundFormValueSelector(state, 'type'),
    },
})

const connectedForm = withTheme(connect(
    mapStateToProps
)(injectIntl(Form)))

export default reduxForm({
    form:     FORM_NAME,
    validate: validate(schema, { allowUnknown: true }),
})(connectedForm)
