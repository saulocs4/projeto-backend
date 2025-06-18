const { searchProductsController } = require('./search.controller');
const { getProductByIdController } = require('./getById.controller');
const { createProductController } = require('./create.controller');
const { updateProductController } = require('./update.controller');
const { deleteProductController } = require('./delete.controller');

module.exports = {
  searchProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
};