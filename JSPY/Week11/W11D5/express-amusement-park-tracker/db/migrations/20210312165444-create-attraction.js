'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Attractions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      parkId: {
        allowNull: false,
        references: {
          model: 'Parks',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      attractionName: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      theme: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      opened: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      riderPerVehicle: {
        type: Sequelize.INTEGER
      },
      visitedOn: {
        type: Sequelize.DATEONLY
      },
      rating: {
        type: Sequelize.INTEGER
      },
      comments: {
        type: Sequelize.TEXT(500)
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Attractions');
  }
};