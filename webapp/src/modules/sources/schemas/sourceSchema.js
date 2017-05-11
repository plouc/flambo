import Joi                  from 'joi-browser'
import { positionFamilies } from '../../../../config/hr'

export default Joi.object().keys({
    name:        Joi.string().required().max(55),
    description: Joi.string().required().min(3).max(255),
    family:      Joi.string().required().valid(positionFamilies),
})
