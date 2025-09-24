'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Characters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      originId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations', // Nombre de la tabla
          key: 'id', // Columna referenciada
        },
        onDelete: 'CASCADE',
      },
      locationId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations', // Nombre de la tabla
          key: 'id', // Columna referenciada
        },
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      species: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Characters');
  }
};