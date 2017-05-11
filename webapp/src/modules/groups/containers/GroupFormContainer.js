import { decorateForm } from '../../../core/components/form'
import Form              from '../components/SourceForm'
import validationSchema from '../schemas/sourceSchema'
import { FORM_NAME }    from '../constants'


export default decorateForm({
    formName: FORM_NAME,
    validationSchema,
})(Form)
