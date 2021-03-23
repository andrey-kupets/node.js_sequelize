const { O_Auth } = require('../dataBase/models');
const { tokenizer } = require('../helpers');

module.exports = {
    createRecord: async (userId) => {
        const tokens = tokenizer();
        await O_Auth.create({ _user_id: userId, ...tokens });

        return tokens;
    },
    findTokensByParams: (token) => O_Auth.findOne(token),
    updateById: (id, updatedObj) => O_Auth.findByIdAndUpdate(id, updatedObj)
};
