const { DataTypes } = require('sequelize');

const { dataBaseTablesEnum: { RATING, RATINGS_T } } = require('../../../constant');

module.exports = (client) => {
    const Rating = client.define(
        RATING,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            student_id: { type: DataTypes.INTEGER },
            lesson_id: { type: DataTypes.INTEGER },
            rating: { type: DataTypes.INTEGER }
        },
        {
            tableName: RATINGS_T,
            timestamps: false
        }
    );

    return Rating;
};
