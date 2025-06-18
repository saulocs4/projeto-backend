const productRepository = require('../../repositories/product');
const prisma = require('../../config/prisma'); 


const createProduct = async (productData) => {
  // 1. Validação de Campos Obrigatórios
  const {
    name,
    slug,
    price,
    category_ids,
    images,
    options,
    enabled = false, // Default para enabled
    stock = 0, // Default para stock
    description = null, // Default para description
    price_with_discount = 0 // Default para price_with_discount
  } = productData;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('O nome do produto é obrigatório.');
  }
  if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
    throw new Error('O slug do produto é obrigatório.');
  }
  if (typeof price !== 'number' || price <= 0) {
    throw new Error('O preço do produto é obrigatório e deve ser um número positivo.');
  }
  if (!Array.isArray(category_ids) || category_ids.length === 0) {
    throw new Error('Pelo menos uma category_id é obrigatória.');
  }
  if (!Array.isArray(images) || images.length === 0) {
    throw new Error('Pelo menos uma imagem é obrigatória.');
  }
  if (!Array.isArray(options)) { // Options pode ser vazio
    throw new Error('As opções do produto devem ser um array.');
  }

  // 2. Validação de Formato e Existência de Relacionamentos
 
  const existingProductBySlug = await prisma.product.findUnique({ where: { slug } });
  if (existingProductBySlug) {
    throw new Error(`O slug '${slug}' já está em uso por outro produto.`);
  }

  // 2.2 Validação de category_ids
  const existingCategories = await prisma.category.findMany({
    where: {
      id: {
        in: category_ids,
      },
    },
    select: { id: true },
  });
  if (existingCategories.length !== category_ids.length) {
    const foundIds = new Set(existingCategories.map(c => c.id));
    const missingIds = category_ids.filter(id => !foundIds.has(id));
    throw new Error(`As seguintes category_ids não foram encontradas: ${missingIds.join(', ')}.`);
  }

  // 2.3 Validação de Imagens
  for (const img of images) {
    if (!img.content || typeof img.content !== 'string' || !img.content.startsWith('http')) {
      throw new Error('Cada imagem deve ter um campo "content" que seja uma URL válida.');
    }
  }

  // 2.4 Validação de Opções
  for (const opt of options) {
    if (!opt.title || typeof opt.title !== 'string' || opt.title.trim().length === 0) {
      throw new Error('Cada opção deve ter um título.');
    }
    if (!opt.shape || typeof opt.shape !== 'string' || opt.shape.trim().length === 0) {
      throw new Error('Cada opção deve ter uma forma (shape).');
    }
    if (!opt.type || typeof opt.type !== 'string' || opt.type.trim().length === 0) {
      throw new Error('Cada opção deve ter um tipo (type).');
    }
    if (!Array.isArray(opt.values) || opt.values.length === 0) {
      throw new Error('Cada opção deve ter um array de valores não vazio.');
    }
  }

  // 3. Preparar dados para o repositório
  const dataToCreate = {
    enabled,
    name: name.trim(),
    slug: slug.trim(),
    stock,
    description: description ? description.trim() : null,
    price,
    price_with_discount,
    category_ids,
    images,
    options,
  };

  // 4. Chamar o repositório para criar o produto
  const newProduct = await productRepository.createProductRepository(dataToCreate);

  // 5. Formatar a resposta final (similar ao GET /:id)
  const formattedProduct = {
    id: newProduct.id,
    enabled: newProduct.enabled,
    name: newProduct.name,
    slug: newProduct.slug,
    stock: newProduct.stock,
    description: newProduct.description,
    price: newProduct.price,
    price_with_discount: newProduct.price_with_discount || 0,
    category_ids: newProduct.categories ? newProduct.categories.map(pc => pc.categoryId) : [],
    images: newProduct.images ? newProduct.images.map(img => ({
      id: img.id,
      content: img.path,
    })) : [],
    options: newProduct.options ? newProduct.options.map(opt => ({
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
  createProduct,
};