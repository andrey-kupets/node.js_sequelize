const { dataBaseTablesEnum: { RATINGS2_T, CHARTS2_T, GRAPHS2_T } } = require('../../../constant');

module.exports = {
    up: async (queryInterface) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

        await queryInterface.renameTable(RATINGS2_T, CHARTS2_T);
    },

    down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

        await queryInterface.renameTable(CHARTS2_T, GRAPHS2_T); // если без down, то UNDO вернет назад (отменит up), а так = down
    }
};
