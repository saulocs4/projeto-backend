const prisma = require('../../config/prisma');

const createCategoryRepository = async (categoryData) => {
  const newCategory = await prisma.category.create({
    data: {
      name: categoryData.name,
      slug: categoryData.slug,
      use_in_menu: categoryData.use_in_menu || false,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      use_in_menu: true,
    },
  });
  return newCategory;
};

module.exports = {
  createCategoryRepository,
};