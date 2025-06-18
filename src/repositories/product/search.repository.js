const prisma = require('../../config/prisma');

const searchProductsRepository = async ({ limit, offset, where, select }) => {
  const findManyOptions = {
    where,
    select,
  };

  if (limit !== -1) { 
    findManyOptions.take = limit;
    findManyOptions.skip = offset;
  }

  const [products, total] = await prisma.$transaction([
    prisma.product.findMany(findManyOptions),
    prisma.product.count({ where }),
  ]);

  return {
    data: products,
    total: total,
  };
};

module.exports = {
  searchProductsRepository,
};