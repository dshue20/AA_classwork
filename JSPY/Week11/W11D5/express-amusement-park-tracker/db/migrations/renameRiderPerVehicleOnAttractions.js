'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Attractions', 'riderPerVehicle', 'ridersPerVehicle', {
      type: Sequelize.Integer,
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Attractions', 'ridersPerVehicle', 'riderPerVehicle', {
      type: Sequelize.Integer,
    })
  }
};