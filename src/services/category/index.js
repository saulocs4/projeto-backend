const { searchCategories } = require('./search.service');
const { getCategoryById } = require('./getById.service');
const { createCategory } = require('./create.service');
const { updateCategory } = require('./update.service');
const { deleteCategory } = require('./delete.service');

module.exports = {
  searchCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};