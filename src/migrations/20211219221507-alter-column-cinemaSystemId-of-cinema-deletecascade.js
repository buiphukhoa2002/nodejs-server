"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // THIS IS NOT VALID
    // WE HAVE TO DROP CONSTRAINTS AND THEN RECREATE IT
    await queryInterface.changeColumn("Cinemas", "cinemaSystemId", {
      type: Sequelize.INTEGER,
      references: {
        model: "CinemaSystems", // table name
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("Cinemas", "cinemaSystemId", {
      type: Sequelize.INTEGER,
      references: {
        model: "CinemaSystems", // table name
        key: "id",
      },
    });
  },
};
