const { User } = require('../dataBase/models');
require('../dataBase/models'); // SUPER WORK!!

module.exports = {
    createUser: (userObj) => User.create(userObj),

    findAllUsers: async (query = {}) => {
        const {
            limit = 20, page = 1, sortBy = 'createdAt', order = 'asc', ...filters
        } = query;
        const skip = (page - 1) * limit;
        const keys = Object.keys(filters);
        const filterObj = {};

        const orderBy = order === 'asc' ? -1 : 1;

        const sort = { [sortBy]: orderBy };

        keys.forEach((key) => {
            switch (key) {
                case 'category':
                    const categories = filters.category.split(';');
                    filterObj.category = { $in: categories };
                    break;
                case 'name':
                    filterObj.name = { $regex: filters.name, $options: 'i' };
                    break;
                default:
                    filterObj[key] = filters[key];
            }
        });

        const users = await User.find(filterObj).limit(+limit).skip(skip).sort(sort);
        const count = await User.countDocuments(filterObj);

        return {
            data: users,
            page,
            limit,
            count,
            pages: Math.ceil(count / limit)
        };
    },

    deleteUser: (userId) => User.deleteOne({ _id: userId }),

    findUserById: (userId) => User.findById(userId),

    findUserByEmail: (email) => User.findOne(email).select('+password'),

    shiftUser: (userId, newUserObj) => User.findByIdAndUpdate(userId, newUserObj),

    updateUserById: (userId, updatedObject) => User.updateOne({ _id: userId }, { $set: updatedObject })
};
