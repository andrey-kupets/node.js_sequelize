const {
    dataBaseTablesEnum: {
        STUDENTS2_T, AGE, YEAR_OF_BORN, YEARS_OLD
    }
} = require('../../../constant');

module.exports = {
    up: async (queryInterface) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

        await queryInterface.renameColumn(STUDENTS2_T, AGE, YEAR_OF_BORN);
    },

    down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

        // eslint-disable-next-line max-len
        await queryInterface.renameColumn(STUDENTS2_T, YEAR_OF_BORN, YEARS_OLD); // если без down, то UNDO вернет назад (отменит up), а так = down
    }
};
