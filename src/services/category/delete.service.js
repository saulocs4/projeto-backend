const categoryRepository = require('../../repositories/category');


const deleteCategory = async (categoryId) => {
 
  const id = parseInt(categoryId, 10);
  if (isNaN(id) || id <= 0) {
    throw new Error('ID da categoria inválido.');
  }

  const deletedCategory = await categoryRepository.deleteCategoryRepository(id);

  return deletedCategory;
};

module.exports = {
  deleteCategory,
};