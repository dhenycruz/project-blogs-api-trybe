const modelCategory = require('../service/category');

const authName = (req, res, next) => {
  const { name } = req.body;
  const result = modelCategory.authName(name);
  if (result !== true) return res.status(result.status).json({ message: result.message });

  next();
};

const createCategory = async (req, res) => {
  const category = await modelCategory.createCategory(req.body);
  console.log(category);
  res.status(201).json(category);
};

module.exports = {
  authName,
  createCategory,
};
