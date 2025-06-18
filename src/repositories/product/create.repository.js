const prisma = require('../../config/prisma');


const createProductRepository = async (productData) => {
  const {
    category_ids,
    images,
    options,
    ...productDetails 
  } = productData;

  let createdProduct;

  try {
    
    createdProduct = await prisma.$transaction(async (prisma) => {
      // 1. Criar o Produto principal
      const newProduct = await prisma.product.create({
        data: {
          ...productDetails,
          // Garante que price_with_discount seja 0 se for null/undefined (conforme formato de saída)
          price_with_discount: productDetails.price_with_discount || 0,
        },
      });

      // 2. Conectar Categorias (ProductCategory)
      if (category_ids && category_ids.length > 0) {
        const productCategoriesData = category_ids.map(categoryId => ({
          productId: newProduct.id,
          categoryId: categoryId,
        }));
        await prisma.productCategory.createMany({
          data: productCategoriesData,    
        });
      }

      // 3. Criar e associar Imagens (ProductImage)
      if (images && images.length > 0) {
        const productImagesData = images.map(img => ({
          productId: newProduct.id,
          path: img.content,
        }));
        await prisma.productImage.createMany({
          data: productImagesData,
        });
      }

      // 4. Criar e associar Opções (ProductOption)
      if (options && options.length > 0) {
        const productOptionsData = options.map(opt => ({
          productId: newProduct.id,
          title: opt.title,
          shape: opt.shape,
          type: opt.type,
          values: JSON.stringify(opt.values),
        }));
        await prisma.productOption.createMany({
            data: productOptionsData,
        });
      }

      // Retornar o produto recém-criado com suas relações carregadas para a camada de serviço
      return prisma.product.findUnique({
        where: { id: newProduct.id },
        include: {
          categories: { 
            select: {
              categoryId: true,
            },
          },
          images: {
            select: {
              id: true,
              path: true,
            },
          },
          options: {
            select: {
              id: true,
              title: true,
              shape: true,
              type: true,
              values: true,
            },
          },
        },
      });
    });

    return createdProduct;

  } catch (error) {
    console.error('Erro no repositório de criação de produto:', error);
    
    throw error; 
  }
};

module.exports = {
  createProductRepository,
};