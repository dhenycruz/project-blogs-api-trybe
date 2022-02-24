const { Category } = require('../../models');
const { User, BlogPost, PostsCategories } = require('../../models');

const authTitle = (title) => {
  if (title === '' || title === undefined) return { status: 400, message: '"title" is required' };
  return true;
};

const authContent = (content) => {
  if (content === '' || content === undefined) {
    return { status: 400, message: '"content" is required' };
  }
  return true;
};

const authCategories = (categories) => {
  if (categories === '' || categories === undefined || typeof categories === 'string') {
    return { status: 400, message: '"categoryIds" is required' };
  }
  return true;
};

const authCategoriesExists = async (categories) => {
  const allCategories = await Category.findAll();
  const alreadyExists = categories.some((category) => {
    const consult = allCategories.filter((bdCategory) => bdCategory.id === category);
    if (consult.length < 1) return true;
    return false;
  });

  if (alreadyExists) return { status: 400, message: '"categoryIds" not found' };

  return true;
};

const savePostCategory = async (postId, catId) => {
  const saveCat = await PostsCategories.create({ postId, categoryId: catId });
  return saveCat;
};

const createPost = async (bodyPost, userId) => {
  const { title, content, categoryIds } = bodyPost;
  const newPost = await BlogPost.create({ title, content, userId });
  
  const postId = newPost.dataValues.id;
  categoryIds.forEach(async (catId) => {
    await savePostCategory(postId, catId);
  });
  
  return newPost.dataValues;
};

const getAll = async () => {
  try {
    const posts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return posts;
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  authTitle,
  authContent,
  authCategories,
  authCategoriesExists,
  createPost,
  getAll,
};
