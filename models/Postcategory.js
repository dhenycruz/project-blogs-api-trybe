module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostsCategories', 
    {},
    { timestamps: false });

  PostCategory.associate = (models) => {
    models.Post.belongsToMany(models.Post, {
      as: 'posts',
      through: PostCategory,
      foreignKey: 'postId', 
      otherkey: 'id',
    });
    models.Category.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherkey: 'id',
    });
  };

  return PostCategory;
};