import Joi from 'joi-browser'


export default Joi.object().keys({
    name: Joi.string().required().max(55),
})
