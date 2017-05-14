import { decorateForm } from '../../../core/components/form'
import Form              from '../components/CollectionForm'
import validationSchema from '../schemas/collectionSchema'
import { FORM_NAME }    from '../constants'


export default decorateForm({
    formName: FORM_NAME,
    validationSchema,
})(Form)
