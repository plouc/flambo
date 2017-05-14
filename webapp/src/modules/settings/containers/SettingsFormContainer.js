import { decorateForm } from '../../../core/components/form'
import Form              from '../components/SettingsForm'
import validationSchema from '../schemas/settingsSchema'
import { FORM_NAME }    from '../constants'


export default decorateForm({
    formName: FORM_NAME,
    validationSchema,
})(Form)
