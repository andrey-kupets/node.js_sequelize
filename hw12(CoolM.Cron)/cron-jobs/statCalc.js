const { User } = require('../dataBase/models');

module.exports = async () => {
    const userCount = await User.countDocuments();
    console.log(userCount);
};
