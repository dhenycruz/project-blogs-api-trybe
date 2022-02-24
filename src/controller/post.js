const modelBlogPost = require('../service/post');

const authTitle = (req, res, next) => {
  const { title } = req.body;
  const result = modelBlogPost.authTitle(title);
  
  if (result !== true) return res.status(result.status).json({ message: result.message });
  next();
};

const authContent = (req, res, next) => {
  const { content } = req.body;
  const result = modelBlogPost.authContent(content);
  
  if (result !== true) return res.status(result.status).json({ message: result.message });
  next();
};

const authCategories = (req, res, next) => {
  const { categoryIds } = req.body;
  const result = modelBlogPost.authCategories(categoryIds);
  
  if (result !== true) return res.status(result.status).json({ message: result.message });
  next();
};

const authCategoriesExists = async (req, res, next) => {
  const { categoryIds } = req.body;
  const result = await modelBlogPost.authCategoriesExists(categoryIds);
  if (result !== true) return res.status(result.status).json({ message: result.message });
  next();
};

const createPost = async (req, res) => {
  const { id } = req.user.dataValues;
  const post = await modelBlogPost.createPost(req.body, id);
  res.status(201).json(post);
};

const getAll = async (_req, res) => {
  const result = await modelBlogPost.getAll();
  res.status(200).json(result);
};

module.exports = {
  authTitle,
  authContent,
  authCategories,
  authCategoriesExists,
  createPost,
  getAll,
};
