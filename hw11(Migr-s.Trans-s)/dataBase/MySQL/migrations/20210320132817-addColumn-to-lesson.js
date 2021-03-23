const { dataBaseTablesEnum: { LESSON2_T, TEST_COLUMN } } = require('../../../constant');

module.exports = {
    up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

        await queryInterface.addColumn(LESSON2_T, TEST_COLUMN, { type: Sequelize.DataTypes.STRING });
    },

    down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

        await queryInterface.removeColumn(LESSON2_T, TEST_COLUMN);
    }
};
