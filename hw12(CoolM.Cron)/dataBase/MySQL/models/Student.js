const { DataTypes } = require('sequelize');

const { dataBaseTablesEnum: { STUDENT, STUDENTS_T } } = require('../../../constant');

module.exports = (client) => {
    const Student = client.define(
        STUDENT,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            age: { type: DataTypes.INTEGER },
            gender: { type: DataTypes.STRING },
            name: { type: DataTypes.STRING }
        },
        {
            tableName: STUDENTS_T,
            timestamps: false
        }
    );

    return Student;
};
