const prisma = require('../../config/prisma');

const searchProductsRepository = async ({ limit, offset }) => {
  const [products, total] = await prisma.$transaction([
    prisma.product.findMany({
      take: limit === -1 ? undefined : limit,
      skip: offset,
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
    }),
    prisma.product.count(),
  ]);

  return {
    data: products,
    total: total,
  };
};

module.exports = {
  searchProductsRepository,
};