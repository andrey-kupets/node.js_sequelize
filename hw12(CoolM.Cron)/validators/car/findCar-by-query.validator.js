const Joi = require('joi');

module.exports = Joi.object({
    model: Joi.string().alphanum().min(2).max(30),
    edition: Joi.number(),
    power_hp: Joi.number(),
    price: Joi.number(),
    category: Joi.string(),
    color: Joi.string(),
    data: Joi.allow(),
    page: Joi.allow(),
    limit: Joi.allow(),
    count: Joi.allow(),
    pages: Joi.allow(),
});
