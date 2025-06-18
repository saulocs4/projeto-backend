const productRepository = require('../../repositories/product');


const updateProduct = async (productId, updateData) => {
  const id = parseInt(productId, 10);
  if (isNaN(id) || id <= 0) {
    throw new Error('ID do produto inválido.');
  }

  const updatedProduct = await productRepository.updateProductRepository(id, updateData);

  
  if (!updatedProduct) {
    return null;
  }

  
  const formattedProduct = {
    id: updatedProduct.id,
    enabled: updatedProduct.enabled,
    name: updatedProduct.name,
    slug: updatedProduct.slug,
    stock: updatedProduct.stock,
    description: updatedProduct.description,
    price: updatedProduct.price,
    price_with_discount: updatedProduct.price_with_discount || 0,
    category_ids: updatedProduct.categories ? updatedProduct.categories.map(pc => pc.categoryId) : [],
    images: updatedProduct.images ? updatedProduct.images.map(img => ({
      id: img.id,
      content: img.path,
    })) : [],
    options: updatedProduct.options ? updatedProduct.options.map(opt => ({
      id: opt.id,
      title: opt.title,
      shape: opt.shape,
      type: opt.type,
      values: opt.values,
    })) : [],
  };

  return formattedProduct;
};

module.exports = {
  updateProduct,
};