const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum: { CAR } } = require('../../constant');

const carSchema = new Schema({
    model: { type: String, required: true },
    edition: { type: Number, required: true },
    power_hp: { type: Number },
    price: { type: Number },
    color: { type: String },
    category: { type: String },
    photos: [{ type: String }],
    docs: [{ type: String }],
    videos: [{ type: String }]
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model(CAR, carSchema);
