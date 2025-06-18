const { searchProducts } = require('./search.service');
const { getProductById } = require('./getById.service');
const { createProduct } = require('./create.service');
const { updateProduct } = require('./update.service');
const { deleteProduct } = require('./delete.service');

module.exports = {
  searchProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};