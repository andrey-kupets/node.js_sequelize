const { responseCodesEnum } = require('../constant');
const {
    BAD_REQUEST,
    INCORRECT_USER,
    JOI_VALIDATION,
    NO_USER,
    USER_EXISTS
} = require('../messages/error.messages');
const ErrorHandler = require('../messages/ErrorHandler');
const userService = require('../service/user.service');
const {
    commonValidators: { mongoIdValidator },
    userValidators: { createUserValidator }
} = require('../validators');

module.exports = {
    isUserValid: (req, res, next) => {
        try {
            const { error } = createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, BAD_REQUEST.customCode, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserIdValid: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await userService.findUserById(userId);

            const { error } = mongoIdValidator.validate(userId);

            if (error) {
                throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, JOI_VALIDATION.customCode, error.details[0].message);
            }

            if (userId !== user.id) {
                throw new ErrorHandler(responseCodesEnum.UNAUTHORIZED, INCORRECT_USER.customCode);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    doesUserExist: async (req, res, next) => {
        try {
            // 1st var
            //
            // const { preferLang = 'ua' } = req.body;
            // const users = await userService.findAllUsers();
            // const invalidUser = users.some((user) => user.email === req.body.email);
            //
            // if (invalidUser) {
            //     throw new Error(errMessages.USER_EXISTS[preferLang]);
            // }

            // 2nd var

            const { email } = req.body;
            const users = await userService.findUserByEmail({ email });

            if (users) {
                throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, USER_EXISTS.customCode);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    areNoUsers: async (req, res, next) => { // лучше вообще не выводить ошибку, а получать пустой массив
        try {
            const users = await userService.findAllUsers(req.query);

            if (!users.length) {
                throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, USER_EXISTS.customCode);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isNoUser: async (req, res, next) => {
        try {
            const { params: { userId } } = req;
            const user = await userService.findUserById(userId);

            if (!user) {
                throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, NO_USER.customCode);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    doesUserPresent: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await userService.findUserByEmail({ email });

            if (!user) {
                throw new Error('NO USER');
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },
};
