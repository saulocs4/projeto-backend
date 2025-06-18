const productRepository = require('../../repositories/product');


const getProductById = async (productId) => {
  
  const id = parseInt(productId, 10);
  if (isNaN(id) || id <= 0) {
    throw new Error('ID do produto inválido.');
  }

 
  const product = await productRepository.getProductByIdRepository(id);

 
  if (!product) {
    return null;
  }

  
  const formattedProduct = {
    id: product.id,
    enabled: product.enabled,
    name: product.name,
    slug: product.slug,
    stock: product.stock,
    description: product.description,
    price: product.price,
    
    price_with_discount: product.price_with_discount === null ? 0 : product.price_with_discount,
    category_ids: product.productCategories ? product.productCategories.map(pc => pc.categoryId) : [],
    images: product.images ? product.images.map(img => ({
      id: img.id,
      content: img.path, 
    })) : [],
    options: product.options ? product.options.map(opt => ({
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
  getProductById,
};