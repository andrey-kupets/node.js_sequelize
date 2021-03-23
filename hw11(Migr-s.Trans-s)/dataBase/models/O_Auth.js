const { Schema, model } = require('mongoose');
const { dataBaseTablesEnum: { O_Auth, USER } } = require('../../constant');

const oAuthSchema = new Schema({
    access_token: { type: String },
    refresh_token: { type: String },
    _user_id: { type: Schema.Types.ObjectId, ref: USER }
}, { timestamps: true });

module.exports = model(O_Auth, oAuthSchema);
