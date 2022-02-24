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

const getPost = async (req, res) => {
  const { id } = req.params;
  const result = await modelBlogPost.getPost(id);
  if (result.status === 404) return res.status(result.status).json({ message: result.message });
  res.status(result.status).json(result.post);
};

const categoriesCannotBeEdited = (req, res, next) => {
  const result = modelBlogPost.categoriesCannotBeEdited(req.body);
  if (result !== true) return res.status(result.status).json({ message: result.message });

  next();
};

const authorizationUser = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.dataValues.id;
  const result = await modelBlogPost.authorizationUser(userId, id);
  console.log(result);
  if (result !== true) return res.status(result.status).json({ message: result.message });

  next();
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.dataValues.id;
  const result = await modelBlogPost.updatePost(req.body, id, userId);
  if (result.status === 200) return res.status(result.status).json(result.post);
  res.status(401).json({ message: result.message });
};

module.exports = {
  authTitle,
  authContent,
  authCategories,
  authCategoriesExists,
  createPost,
  getAll,
  getPost,
  updatePost,
  categoriesCannotBeEdited,
  authorizationUser,
};
