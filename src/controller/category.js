const modelCategory = require('../service/category');

const authName = (req, res, next) => {
  const { name } = req.body;
  const result = modelCategory.authName(name);
  if (result !== true) return res.status(result.status).json({ message: result.message });

  next();
};

const getAll = async (_req, res) => {
  const categories = await modelCategory.getAll();
  res.status(200).json(categories);
};

const createCategory = async (req, res) => {
  const category = await modelCategory.createCategory(req.body);
  res.status(201).json(category);
};

module.exports = {
  authName,
  createCategory,
  getAll,
};
