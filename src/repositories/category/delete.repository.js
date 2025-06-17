const prisma = require('../../config/prisma');


const deleteCategoryRepository = async (categoryId) => {
  try {
    const deletedCategory = await prisma.category.delete({
      where: { id: categoryId },
      select: { 
        id: true,
        name: true,
      },
    });
    return deletedCategory;
  } catch (error) {
    
    if (error.code === 'P2025') {
      return null; 
    }
    throw error; 
  }
};

module.exports = {
  deleteCategoryRepository,
};