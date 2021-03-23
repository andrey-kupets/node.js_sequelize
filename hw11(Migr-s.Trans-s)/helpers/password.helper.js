const bcrypt = require('bcrypt');

const { authMsg: { errorMsg } } = require('../messages');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashpassword, preferLang) => {
        const doesPasswordEqual = await bcrypt.compare(password, hashpassword);

        if (!doesPasswordEqual) {
            throw new Error(errorMsg.WRONG_EMAIL_OR_PASSWORD[preferLang]);
        }
    }
};
