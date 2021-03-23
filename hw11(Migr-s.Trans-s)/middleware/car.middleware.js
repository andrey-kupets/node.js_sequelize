const { responseCodesEnum } = require('../constant');
const {
    BAD_REQUEST,
    JOI_VALIDATION,
    NO_CAR,
    NO_CARS,
    CAR_EXISTS
} = require('../messages/error.messages');
const ErrorHandler = require('../messages/ErrorHandler');
const carService = require('../service/car.service');
const {
    carValidators: { createCarValidator },
    commonValidators: { mongoIdValidator }
} = require('../validators');

module.exports = {
    isCarValid: (req, res, next) => {
        try {
            const { error } = createCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, BAD_REQUEST.customCode, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isCarIdValid: (req, res, next) => {
        try {
            const { carId } = req.params;

            const { error } = mongoIdValidator.validate(carId);

            if (error) {
                throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, JOI_VALIDATION.customCode, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    doesCarExist: async (req, res, next) => {
        try {
            const cars = await carService.findAllCars(req.body);

            if (cars.length) {
                throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, CAR_EXISTS.customCode);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    areNoCars: async (req, res, next) => { // лучше вообще не выводить ошибку, а получать пустой массив
        try {
            const cars = await carService.findAllCars(req.query);

            if (!cars.length) {
                throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, NO_CARS.customCode);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isNoCar: async (req, res, next) => {
        try {
            const { params: { carId } } = req;
            const car = await carService.findCarById(carId);

            if (!car) {
                throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, NO_CAR.customCode);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
