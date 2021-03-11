'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Parks', [
      {
        parkName: "People's Park",
        city: "Berkeley",
        provinceState: "CA",
        country: "USA",
        opened: new Date('1968-01-01'),
        size: "1 acre",
        description: "the goat park",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Parks', null, {});
  }
};
