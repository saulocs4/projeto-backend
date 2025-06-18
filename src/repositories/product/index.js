const { searchProductsRepository } = require('./search.repository');
const { getProductByIdRepository } = require('./getById.repository');
const { createProductRepository } = require('./create.repository');
const { updateProductRepository } = require('./update.repository');
const { deleteProductRepository } = require('./delete.repository');

module.exports = {
  searchProductsRepository,
  getProductByIdRepository,
  createProductRepository,
  updateProductRepository,
  deleteProductRepository
};