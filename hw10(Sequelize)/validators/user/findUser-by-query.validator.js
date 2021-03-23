const Joi = require('joi');

const { regexpEnum } = require('../../constant');

module.exports = Joi.object({
    name: Joi.string().min(2).max(30),
    email: Joi.string().regex(regexpEnum.EMAIL_REGEXP)
});
