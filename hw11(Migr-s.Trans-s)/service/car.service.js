const { Car } = require('../dataBase/models');

// priceGte=3000&priceLte=7000&power_hpGte=200&power_hpLte=250&category=car;lg;xxx&color=red&limit=20&page=7
// price: { $gte: 3000, $lte: 7000 }
//
// { category: { $in: [categoryArr] } }

module.exports = {
    createCar: (carObj) => Car.create(carObj),

    findAllCars: async (query = {}) => {
        const {
            limit = 20, page = 1, sortBy = 'power_hp', order = 'asc', ...filters
        } = query;
        const skip = (page - 1) * limit;
        const keys = Object.keys(filters); // [ priceGte, priceLte, power_hpGte, power_hpLte, category, color ]
        const filterObj = {};

        const orderBy = order === 'asc' ? -1 : 1;

        const sort = { [sortBy]: orderBy };

        keys.forEach((key) => {
            switch (key) {
                case 'priceGte':
                    filterObj.price = Object.assign({}, filterObj.price, { $gte: +filters.priceGte });
                    break;
                case 'priceLte':
                    filterObj.price = Object.assign({}, filterObj.price, { $lte: +filters.priceLte });
                    break;
                case 'power_hpGte':
                    filterObj.power_hp = Object.assign({}, filterObj.power_hp, { $gte: +filters.power_hpGte });
                    break;
                case 'power_hpLte':
                    filterObj.power_hp = Object.assign({}, filterObj.power_hp, { $lte: +filters.power_hpLte });
                    break;
                case 'category':
                    const categories = filters.category.split(';');
                    filterObj.category = { $in: categories };
                    break;
                default:
                    filterObj[key] = filters[key];
            }
        });

        console.log('-----------------------------');
        console.log(filterObj);
        console.log('-----------------------------');

        const cars = await Car.find(filterObj).limit(+limit).skip(skip).sort(sort);
        const count = await Car.countDocuments(filterObj);

        return {
            data: cars,
            page,
            limit,
            count,
            pages: Math.ceil(count / limit)
        };
    },

    deleteCar: (carId) => Car.deleteOne({ _id: carId }),

    findCarById: (carId) => Car.findById(carId),

    shiftCar: (carId, newCarObj) => Car.findByIdAndUpdate(carId, newCarObj),

    updateCarById: (carId, updatedObject) => Car.updateOne({ _id: carId }, { $set: updatedObject })
};
