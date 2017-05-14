import Joi from 'joi-browser'


export default Joi.object().keys({
    content: Joi.string().required(),
})
