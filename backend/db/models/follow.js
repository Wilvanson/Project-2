'use strict';
module.exports = (sequelize, DataTypes) => {
  const follow = sequelize.define('follow', {
    userId: DataTypes.INTEGER,
    followerId: DataTypes.INTEGER
  }, {});
  follow.associate = function(models) {
    follow.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return follow;
};