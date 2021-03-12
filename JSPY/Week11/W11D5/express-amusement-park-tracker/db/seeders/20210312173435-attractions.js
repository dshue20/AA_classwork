'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Attractions', [
      {
        attractionName: "Basketball Court",
        parkId: 3,
        theme: 'sports',
        opened: new Date('1968-01-01'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Attractions', null, {});
  }
};
