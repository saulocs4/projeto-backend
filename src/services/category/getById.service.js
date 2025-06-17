const categoryRepository = require('../../repositories/category');

const getCategoryById = async (categoryId) => {
  // 1. Validação do ID
  const id = parseInt(categoryId, 10);
  if (isNaN(id) || id <= 0) {
    throw new Error('ID da categoria inválido.');
  }

  // 2. Chamar o repositório
  const category = await categoryRepository.getCategoryByIdRepository(id);

  return category;
};

module.exports = {
  getCategoryById,
};