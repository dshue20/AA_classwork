'use strict';
module.exports = (sequelize, DataTypes) => {
  const Noodle = sequelize.define('Noodle', {
    name: DataTypes.STRING,
    isStuffed: DataTypes.BOOLEAN
  }, {});
  Noodle.associate = function(models) {
    Noodle.hasMany(models.Pasta, { foreignKey: 'noodleId' });
  };
  return Noodle;
};