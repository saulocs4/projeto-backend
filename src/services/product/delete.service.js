const productRepository = require('../../repositories/product');

const deleteProduct = async (productId) => {
  const id = parseInt(productId, 10);
  if (isNaN(id) || id <= 0) {
    throw new Error('ID do produto inválido.');
  }

  
  const isDeleted = await productRepository.deleteProductRepository(id);

  return isDeleted;
};

module.exports = {
  deleteProduct,
};