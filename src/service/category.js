const { Category } = require('../../models');

const authName = (name) => {
  if (name === '' || name === undefined) return { status: 400, message: '"name" is required' };
  
  return true;
};

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

const createCategory = async ({ name }) => {
  try {
    const category = await Category.create({ name });
    return category;
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  createCategory,
  authName,
  getAll,
};
