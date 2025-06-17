const prisma = require('../../config/prisma');

const searchCategoriesRepository = async (options) => {
  const { limit, page, fields, useInMenu } = options;

  const where = {}; 

  // Adiciona filtro por use_in_menu se fornecido
  if (useInMenu !== undefined) {
    where.use_in_menu = useInMenu;
  }

  const select = {}; 

  // Adiciona campos selecionados se fornecidos. O 'id' sempre será retornado.
  if (fields && fields.length > 0) {
    fields.forEach(field => {
      select[field] = true;
    });
    // Garante que o ID sempre seja selecionado, mesmo se não estiver em 'fields'
    select.id = true;
  } else {
    
    select.id = true;
    select.name = true;
    select.slug = true;
    select.use_in_menu = true;
    
  }

  // Define as opções de paginação (skip e take)
  let skip = 0;
  let take = undefined;

  if (limit !== -1) {
    take = limit;
    skip = (page - 1) * limit;
  }

  // Consulta para obter os dados das categorias
  const categories = await prisma.category.findMany({
    where: where,
    select: select,
    skip: skip,
    take: take,
  });

  // Consulta para obter o total de categorias que correspondem ao filtro (sem paginação)
  const total = await prisma.category.count({
    where: where,
  });

  return {
    data: categories,
    total: total,
  };
};

module.exports = {
  searchCategoriesRepository,
};