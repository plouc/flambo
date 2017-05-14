import { decorateForm } from '../../../core/components/form'
import Form              from '../components/GroupForm'
import validationSchema from '../schemas/groupSchema'
import { FORM_NAME }    from '../constants'


export default decorateForm({
    formName: FORM_NAME,
    validationSchema,
})(Form)
