const productRepository = require('../../repositories/product');

  const searchProducts = async (queryParams) => {
  const defaultLimit = 12;
  const defaultPage = 1;

  let limit = parseInt(queryParams.limit, 10);
  if (isNaN(limit) || (limit < -1) || limit === 0) {
    limit = defaultLimit;
  }

  let page = parseInt(queryParams.page, 10);
  if (isNaN(page) || page < 1) {
    page = defaultPage;
  }

  const offset = (limit === -1) ? 0 : (page - 1) * limit;

  // Chama o repositório com os parâmetros de paginação
  const { data, total } = await productRepository.searchProductsRepository({
    limit,
    offset,
  });

  // Formatar a resposta final para corresponder ao formato de saída desejado
  const formattedData = data.map(product => ({
    id: product.id,
    enabled: product.enabled,
    name: product.name,
    slug: product.slug,
    stock: product.stock,
    description: product.description,
    price: product.price,
    price_with_discount: product.price_with_discount === null ? 0 : product.price_with_discount,
    category_ids: product.categories ? product.categories.map(pc => pc.categoryId) : [],
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
  }));

  return {
    data: formattedData,
    total: total,
    limit: limit,
    page: (limit === -1) ? 1 : page,
  };
};

module.exports = {
  searchProducts,
};