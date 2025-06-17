const categoryRepository = require('../../repositories/category');


const createCategory = async (categoryData) => {
  const { name, slug, use_in_menu } = categoryData;

  // 1. Validação dos dados de entrada conforme o requisito
  if (!name || name.trim() === '') {
    throw new Error('O nome da categoria é obrigatório e não pode ser vazio.');
  }
  if (!slug || slug.trim() === '') {
    throw new Error('O slug da categoria é obrigatório e não pode ser vazio.');
  }


  const dataToCreate = {
    name: name.trim(),
    slug: slug.trim(),
    
    use_in_menu: typeof use_in_menu === 'boolean' ? use_in_menu : false,
  };

  // 2. Chamar o repositório para criar a categoria
  const newCategory = await categoryRepository.createCategoryRepository(dataToCreate);

  return newCategory;
};

module.exports = {
  createCategory,
};