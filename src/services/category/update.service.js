const categoryRepository = require('../../repositories/category');


const updateCategory = async (categoryId, updateData) => {
    
  // 1. Validação do ID
  const id = parseInt(categoryId, 10);
  if (isNaN(id) || id <= 0) {
    throw new Error('ID da categoria inválido.');
  }

  // 2. Validação dos dados de atualização 
  const { name, slug, use_in_menu } = updateData;

  if (!name && !slug && typeof use_in_menu === 'undefined') {
    throw new Error('Nenhum dado de atualização fornecido. É necessário fornecer "name", "slug" ou "use_in_menu".');
  }

  // Validação de tipo e trim para name e slug, se fornecidos
  const dataToUpdate = {};
  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim() === '') {
      throw new Error('O nome da categoria deve ser uma string não vazia.');
    }
    dataToUpdate.name = name.trim();
  }
  if (slug !== undefined) {
    if (typeof slug !== 'string' || slug.trim() === '') {
      throw new Error('O slug da categoria deve ser uma string não vazia.');
    }
    dataToUpdate.slug = slug.trim();
  }
  if (use_in_menu !== undefined) {
    if (typeof use_in_menu !== 'boolean') {
      throw new Error('O campo use_in_menu deve ser um booleano (true ou false).');
    }
    dataToUpdate.use_in_menu = use_in_menu;
  }

  // 3. Chamar o repositório para atualizar a categoria
  const updatedCategory = await categoryRepository.updateCategoryRepository(id, dataToUpdate);

  return updatedCategory;
};

module.exports = {
  updateCategory,
};