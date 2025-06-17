const categoryRepository = require('../../repositories/category');

const searchCategories = async (queryParams) => {
  // 1. Definição e validação dos parâmetros
  const defaultLimit = 12;
  const defaultPage = 1;
  const defaultFields = ['id', 'name', 'slug', 'use_in_menu'];

  // Converter 'limit' para número.
  let limit = parseInt(queryParams.limit, 10);
  if (isNaN(limit) || limit < -1 || limit === 0) {
    limit = defaultLimit;
  }

  // Converter 'page' para número. Se limit for -1, 'page' é ignorado.
  let page = parseInt(queryParams.page, 10);
  if (isNaN(page) || page < 1) {
    page = defaultPage;
  }

  // Converter 'fields' para array de strings.
  let fields = defaultFields;
  if (queryParams.fields) {
    fields = queryParams.fields.split(',').map(field => field.trim()).filter(field => field !== '');
    
    if (fields.length === 0) {
        fields = defaultFields;
    }
  }

  // Converter 'use_in_menu' para boolean.
  let useInMenu = undefined;
  if (queryParams.use_in_menu !== undefined) {
    if (queryParams.use_in_menu === 'true') {
      useInMenu = true;
    } else if (queryParams.use_in_menu === 'false') {
      useInMenu = false;
    } else {
      
      throw new Error('O parâmetro use_in_menu deve ser "true" ou "false".');
    }
  }

  // 2. Chamar o repositório com os parâmetros processados
  const { data, total } = await categoryRepository.searchCategoriesRepository({
    limit,
    page,
    fields,
    useInMenu,
  });

  // 3. Preparar e retornar a resposta conforme o requisito
  return {
    data: data,
    total: total,
    limit: limit,
    page: (limit === -1) ? 1 : page,
  };
};

module.exports = {
  searchCategories,
};