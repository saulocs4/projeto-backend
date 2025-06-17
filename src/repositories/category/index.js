const { searchCategoriesRepository } = require('./search.resitory');
const { getCategoryByIdRepository } = require('./getById.repository');
const { createCategoryRepository } = require('./create.repository');
const { updateCategoryRepository } = require('./update.repository');
const { deleteCategoryRepository } = require('./delete.repository');

module.exports = {
  searchCategoriesRepository,
  getCategoryByIdRepository,
  createCategoryRepository,
  updateCategoryRepository,
  deleteCategoryRepository,
};