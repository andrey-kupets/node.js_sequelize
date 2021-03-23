const {
    responseCodesEnum,
    directoriesEnum: {
        CAR, DOCS, PHOTOS, VIDEOS
    }
} = require('../constant');
const { filesHandler } = require('../helpers');
const { carMsg: { confirmMsg } } = require('../messages');
const { carService } = require('../service');

module.exports = {
    createCar: async (req, res, next) => {
        try {
            const {
                body: { preferLang = 'ua' }, docs, photos, videos
            } = req;
            const car = await carService.createCar(req.body, preferLang);

            if (docs) {
                const uploadPath = await filesHandler.uploadFiles(CAR, DOCS, docs, car._id);

                await carService.updateCarById(car._id, { docs: uploadPath });
            }

            if (photos) {
                const uploadPath = await filesHandler.uploadFiles(CAR, PHOTOS, photos, car._id);

                await carService.updateCarById(car._id, { photos: uploadPath });
            }

            if (videos) {
                const uploadPath = await filesHandler.uploadFiles(CAR, VIDEOS, videos, car._id);

                await carService.updateCarById(car._id, { docs: uploadPath });
            }

            res.status(responseCodesEnum.CREATED).json(confirmMsg.CAR_CREATED[preferLang]);
        } catch (e) {
            next(e);
        }
    },

    getAllCars: async (req, res, next) => {
        try {
            const { query } = req;
            const cars = await carService.findAllCars(query);

            res.status(responseCodesEnum.OK).json(cars);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { carId } = req.params;

            await carService.deleteCar(carId);

            res.json('Car is deleted').status(responseCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    getCarById: async (req, res, next) => {
        try {
            const { params: { carId } } = req;
            const car = await carService.findCarById(carId);

            res.status(responseCodesEnum.OK).json(car);
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { carId } = req.params;
            const { preferLang = 'ua' } = req.body;

            await carService.shiftCar(carId, req.body);

            res.status(responseCodesEnum.OK).json(confirmMsg.CAR_UPDATED[preferLang]);
        } catch (e) {
            next(e);
        }
    }
};
