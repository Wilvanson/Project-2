'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    authorId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {});
  Story.associate = function(models) {
    Story.belongsTo(models.User, { foreignKey: 'authorId' })
    Story.hasMany(models.comments, { foreignKey: 'storyId'})
    Story.hasMany(models.like, { foreignKey: 'storyId'})
  };
  return Story;
};