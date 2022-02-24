module.exports = (sequelize, _DataTypes) => {
  /* const PostCategory = sequelize.define('PostsCategories', 
  {}, { timestamps: false });
  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      // as: 'posts',
      through: PostCategory,
      foreignKey: 'id',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      // as: 'categories',
      through: PostCategory,
      foreignKey: 'id',
      otherKey: 'categoryId',
    });
  }; */
  const PostCategory = sequelize.define('PostsCategories', {}, { timestamps: false });
  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, 
      { foreignKey: 'postId', through: PostCategory });
    models.BlogPost.belongsToMany(models.Category,
      { foreignKey: 'categoryId', through: PostCategory });
  };

  return PostCategory;
};
