const prisma = require('../../config/prisma');

const getProductByIdRepository = async (productId) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
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
      categories: { 
        select: {
          categoryId: true,
        },
      },
    },
  });
  return product;
};

module.exports = {
  getProductByIdRepository,
};