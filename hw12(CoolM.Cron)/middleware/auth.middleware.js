const jwt = require('jsonwebtoken');

const {
    ACCESS_DENIED,
    ACCESS_TOKEN_IS_REQUIRED,
    ACCESS_TOKEN_IS_NOT_VALID,
    ACCESS_TOKEN_IS_NOT_VALID_VERIFY,
    JOI_VALIDATION,
    REFRESH_TOKEN_IS_REQUIRED,
    REFRESH_TOKEN_IS_NOT_VALID,
    REFRESH_TOKEN_IS_NOT_VALID_VERIFY
} = require('../messages/error.messages');
const { authService } = require('../service');
const { authValidators: { authValidator } } = require('../validators');
const { constants: { AUTHORIZATION } } = require('../constant');
const ErrorHandler = require('../messages/ErrorHandler');
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../config/config');
const { responseCodesEnum } = require('../constant');

module.exports = {
    authValid: (req, res, next) => {
        try {
            const { error } = authValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, JOI_VALIDATION.customCode, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, ACCESS_TOKEN_IS_REQUIRED.customCode);
            }

            jwt.verify(access_token, JWT_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(responseCodesEnum.UNAUTHORIZED, ACCESS_TOKEN_IS_NOT_VALID_VERIFY.customCode);
                }
            });

            const tokens = await authService.findTokensByParams({ access_token }).populate('_user_id');

            if (!tokens) {
                throw new ErrorHandler(responseCodesEnum.FORBIDDEN, ACCESS_TOKEN_IS_NOT_VALID.customCode);
            }

            console.log(access_token);

            req.user = tokens._user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, REFRESH_TOKEN_IS_REQUIRED.customCode);
            }

            jwt.verify(refresh_token, JWT_REFRESH_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(responseCodesEnum.UNAUTHORIZED, REFRESH_TOKEN_IS_NOT_VALID_VERIFY.customCode);
                }
            });

            const tokens = await authService.findTokensByParams({ refresh_token });

            if (!tokens) {
                throw new ErrorHandler(responseCodesEnum.FORBIDDEN, REFRESH_TOKEN_IS_NOT_VALID.customCode);
            }

            req.tokenInfo = tokens;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkForRole: (whoHasAccess = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            if (!whoHasAccess.length) {
                return next();
            }

            if (!whoHasAccess.includes(role)) {
                throw new ErrorHandler(responseCodesEnum.FORBIDDEN, ACCESS_DENIED.customCode,
                    ACCESS_DENIED.ua);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
