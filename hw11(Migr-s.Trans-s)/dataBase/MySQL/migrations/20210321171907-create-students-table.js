const { dataBaseTablesEnum: { STUDENTS2_T } } = require('../../../constant');

module.exports = {
    up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

        await queryInterface.createTable(STUDENTS2_T, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            age: { type: Sequelize.DataTypes.INTEGER },
            gender: { type: Sequelize.DataTypes.STRING },
            name: { type: Sequelize.DataTypes.STRING }
        });
    },

    down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

        await queryInterface.dropTable(STUDENTS2_T);
    }
};
