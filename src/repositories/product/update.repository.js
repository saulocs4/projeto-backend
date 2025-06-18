const prisma = require('../../config/prisma');


const updateProductRepository = async (productId, updateData) => {
  const {
    category_ids,
    images,
    options,
    ...productDetails
  } = updateData;

  
  if (productDetails.price_with_discount !== undefined) {
    productDetails.price_with_discount = productDetails.price_with_discount || 0;
  }

  try {
    const updatedProduct = await prisma.$transaction(async (prisma) => {
     
      const existingProduct = await prisma.product.findUnique({
        where: { id: productId },
        select: { id: true, categories: true, images: true, options: true },
      });

      if (!existingProduct) {
        return null;
      }

      // 1. Atualizar o Produto principal
      await prisma.product.update({
        where: { id: productId },
        data: productDetails,
      });

      // 2. Atualizar Categorias (ProductCategory)
      if (category_ids !== undefined) {
        // Remover todas as categorias atuais e recriar com as novas
        await prisma.productCategory.deleteMany({
          where: { productId: productId },
        });
        if (category_ids.length > 0) {
          await prisma.productCategory.createMany({
            data: category_ids.map(categoryId => ({
              productId: productId,
              categoryId: categoryId,
            })),
            skipDuplicates: true,
          });
        }
      }

      // 3. Atualizar Imagens (ProductImage)
      if (images !== undefined) {
        for (const img of images) {
          if (img.id && img.deleted) {
            await prisma.productImage.delete({ where: { id: img.id } });
          } else if (img.id) { // Atualiza (mesmo que só content seja enviado)
            await prisma.productImage.update({
              where: { id: img.id },
              data: { path: img.content },
            });
          } else if (img.content) { // Nova imagem
            await prisma.productImage.create({
              data: {
                productId: productId,
                path: img.content,
              },
            });
          }
        }
      }

      // 4. Atualizar Opções (ProductOption)
      if (options !== undefined) {
        for (const opt of options) {
          if (opt.id && opt.deleted) {
            await prisma.productOption.delete({ where: { id: opt.id } });
          } else if (opt.id) { // Atualiza opção existente
            const updateOptionData = {
              title: opt.title,
              shape: opt.shape,
              type: opt.type,
              values: opt.values ? JSON.stringify(opt.values) : undefined,
            };
            // Remover undefineds para que o Prisma não tente atualizar campos não fornecidos
            Object.keys(updateOptionData).forEach(key => updateOptionData[key] === undefined && delete updateOptionData[key]);

            await prisma.productOption.update({
              where: { id: opt.id },
              data: updateOptionData,
            });
          } else if (opt.title && opt.shape && opt.type && opt.values) { // Nova opção
            await prisma.productOption.create({
              data: {
                productId: productId,
                title: opt.title,
                shape: opt.shape,
                type: opt.type,
                values: JSON.stringify(opt.values),
              },
            });
          }
        }
      }

    
      return prisma.product.findUnique({
        where: { id: productId },
        include: {
          categories: { select: { categoryId: true } },
          images: { select: { id: true, path: true } },
          options: { select: { id: true, title: true, shape: true, type: true, values: true } },
        },
      });
    });

    return updatedProduct;

  } catch (error) {
    
    console.error('Erro no repositório de atualização de produto:', error);
    throw error;
  }
};

module.exports = {
  updateProductRepository,
};