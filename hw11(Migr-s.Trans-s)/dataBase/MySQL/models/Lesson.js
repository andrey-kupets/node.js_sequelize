const { DataTypes } = require('sequelize');

const { dataBaseTablesEnum: { LESSON, LESSON_T } } = require('../../../constant');

module.exports = (client) => {
    const Lesson = client.define(
        LESSON,
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                // allowNull: false,
                primaryKey: true
            },
            date: { type: DataTypes.STRING },
            label: { type: DataTypes.STRING },
            student_count: { type: DataTypes.INTEGER }
        },
        {
            tableName: LESSON_T,
            timestamps: false
        }
    );

    return Lesson;
};
