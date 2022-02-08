'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    userId: DataTypes.INTEGER,
    storyId: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {});
  comments.associate = function(models) {
    comments.belongsTo(models.User, { foreignKey: 'userId' })
    comments.belongsTo(models.Story, { foreignKey: 'storyId' })
  };
  return comments;
};