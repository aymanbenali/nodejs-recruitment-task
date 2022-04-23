"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("Movies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
      },
      userId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      Title: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "",
      },
      Released: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "",
      },
      Genre: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "",
      },
      Director: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
