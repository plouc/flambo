import { decorateForm } from '../../../../core/components/form'
import PositionForm     from '../components/PositionForm'
import validationSchema from '../schemas/positionSchema'
import { FORM_NAME }    from '../constants'


export default decorateForm({
    formName: FORM_NAME,
    validationSchema,
})(PositionForm)
