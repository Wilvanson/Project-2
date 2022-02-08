'use strict';
module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define('like', {
    userId: DataTypes.INTEGER,
    storyId: DataTypes.INTEGER
  }, {});
  like.associate = function(models) {
    like.belongsTo(models.User, { foreignKey: 'userId' })
    like.belongsTo(models.Story, { foreignKey: 'storyId' })
  };
  return like;
};