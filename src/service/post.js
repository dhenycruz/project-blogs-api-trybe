const { Category } = require('../../models');
const { BlogPost, PostsCategories } = require('../../models');

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

/* {
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "categoryIds": [1, 2]
} */

const savePostCategory = async (postId, catId) => {
  const saveCat = await PostsCategories.create({ postId, categoryId: catId });
  return saveCat;
};

const createPost = async (bodyPost, userId) => {
  const { title, content, categoryIds } = bodyPost;
  const newPost = await BlogPost.create({ title, content, userId });
  
  const postId = newPost.dataValues.id;
  console.log(categoryIds);
  categoryIds.forEach(async (catId) => {
    console.log(catId);
    // const save = await PostsCategories.create({ postId, catId });
    await savePostCategory(postId, catId);
  });
  
  return newPost.dataValues;
};

module.exports = {
  authTitle,
  authContent,
  authCategories,
  authCategoriesExists,
  createPost,
};
