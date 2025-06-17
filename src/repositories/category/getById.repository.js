const prisma = require('../../config/prisma');


const getCategoryByIdRepository = async (categoryId) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    select: { 
      id: true,
      name: true,
      slug: true,
      use_in_menu: true,
      
    },
  });
  return category;
};

module.exports = {
  getCategoryByIdRepository,
};