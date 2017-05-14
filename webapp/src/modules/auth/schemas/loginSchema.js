import Joi from 'joi-browser'


export default Joi.object().keys({
    login:    Joi.string().required(),
    password: Joi.string().required(),
})
