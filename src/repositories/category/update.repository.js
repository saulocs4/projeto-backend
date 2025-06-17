const prisma = require('../../config/prisma');


const updateCategoryRepository = async (categoryId, updateData) => {
  try {
    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: {
        name: updateData.name,
        slug: updateData.slug,
        
        use_in_menu: typeof updateData.use_in_menu === 'boolean' ? updateData.use_in_menu : undefined,
        
      },
      select: { 
        id: true,
        name: true,
        slug: true,
        use_in_menu: true,
      },
    });
    return updatedCategory;
  } catch (error) {
    
    if (error.code === 'P2025') {
      return null; 
    }
    throw error; 
  }
};

module.exports = {
  updateCategoryRepository,
};