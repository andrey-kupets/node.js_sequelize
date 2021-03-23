const { dataBaseTablesEnum: { RATINGS2_T } } = require('../../../constant');

module.exports = {
    up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

        await queryInterface.createTable(RATINGS2_T, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            student_id: { type: Sequelize.DataTypes.INTEGER },
            lesson_id: { type: Sequelize.DataTypes.INTEGER },
            rating: { type: Sequelize.DataTypes.INTEGER }
        });
    },

    down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

        await queryInterface.dropTable(RATINGS2_T);
    }
};
