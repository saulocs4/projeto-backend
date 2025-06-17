const { searchCategoriesController } = require('./search.controller');
const { getCategoryByIdController } = require('./getById.controller');
const { createCategoryController } = require('./create.controller');
const { updateCategoryController } = require('./update.controller');
const { deleteCategoryController } = require('./delete.controller');

module.exports = {
  searchCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
};