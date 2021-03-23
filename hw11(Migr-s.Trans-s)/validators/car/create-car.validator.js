const Joi = require('joi');

module.exports = Joi.object({
    model: Joi.string()
        .alphanum()
        .required(),
    edition: Joi.number()
        .required(),
    power_hp: Joi.number()
});
