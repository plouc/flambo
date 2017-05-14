import { decorateForm } from '../../../core/components/form'
import Form              from '../components/CommentForm'
import validationSchema from '../schemas/commentSchema'


export default decorateForm({
    formName: 'comment',
    validationSchema,
})(Form)
