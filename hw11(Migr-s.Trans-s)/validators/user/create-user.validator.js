const Joi = require('joi');

const { constants, regexpEnum } = require('../../constant');

const girlSubSchema = Joi.array().items(
    Joi.object({
        name: Joi.string().alphanum().max(40)
    })
);

module.exports = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        // .allow('X Æ A-Xii')
        .required(),
    email: Joi.string().regex(regexpEnum.EMAIL_REGEXP).required(),
    password: Joi.string().regex(regexpEnum.PASSWORD_REGEXP).required(),
    cars: Joi.boolean(),
    yearOfBorn: Joi.number().integer().min(constants.CURRENT_YEAR - 100).max(constants.CURRENT_YEAR),
    girls: girlSubSchema.optional().when('cars', { is: true, then: Joi.required() })
});
