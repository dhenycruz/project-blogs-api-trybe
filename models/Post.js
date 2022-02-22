module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('BlogPosts', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.TIMESTAMPS,
    updated: DataTypes.TIMESTAMPS,
  },
  {
    timesstamps: false,
    tableName: 'BlogPosts',
    underscored: true,
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User,
      { foreignKey: 'id', as: 'users' });
  };

  return Post;
};
