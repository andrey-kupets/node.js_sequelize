const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum: { USER } } = require('../../constant');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, select: false },
    cars: [{ type: Schema.Types.ObjectId }],
    avatar: { type: String },
    docs: [{ type: String }],
    videos: [{ type: String }]
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userSchema.virtual('full_userData').get(function() {
    return `${this._id} | ${this.name} | ${this.email} | ${this.password} | cars: ${this.cars.length}`;
});

userSchema.virtual('_userCars', {
    ref: 'Car',
    localField: 'cars',
    foreignField: '_id',
    // justOne: true, // тогда попюлейт вернет один объект, а не массив (из одного объекта), если даже тача у юзера - одна
    // options: {
    //     select: 'model'
    // }
});

userSchema
    .pre('find', function() {
        this.populate('_userCars');
    })
    .pre('findOne', function() {
        this.populate('_userCars');
    });

module.exports = model(USER, userSchema);
