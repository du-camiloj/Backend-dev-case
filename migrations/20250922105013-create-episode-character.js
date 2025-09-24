'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EpisodeCharacters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      episodeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Episodes', // Nombre de la tabla
          key: 'id', // Columna referenciada
        },
        onDelete: 'CASCADE',
      },
      characterId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Characters', // Nombre de la tabla
          key: 'id', // Columna referenciada
        },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('EpisodeCharacters');
  }
};