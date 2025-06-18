const productRepository = require('../../repositories/product');


const searchProducts = async (queryParams) => {
  const defaultLimit = 12;
  const defaultPage = 1;

  // Campos padrão que devem ser incluídos, mesmo que não solicitados explicitamente
  const baseFields = ['id', 'enabled', 'name', 'slug', 'stock', 'description', 'price', 'price_with_discount'];

  // --- 1. Processar e Validar Parâmetros de Paginação e Seleção ---
  let limit = parseInt(queryParams.limit, 10);
  if (isNaN(limit) || (limit < -1) || limit === 0) {
    limit = defaultLimit;
  }

  let page = parseInt(queryParams.page, 10);
  if (isNaN(page) || page < 1) {
    page = defaultPage;
  }

  const offset = (limit === -1) ? 0 : (page - 1) * limit;

  // Construir o objeto 'select' para o Prisma
  let requestedFields = [];
  if (queryParams.fields) {
    requestedFields = queryParams.fields.split(',').map(field => field.trim()).filter(field => field !== '');
  }

  // Combinar campos padrão com os solicitados
  const effectiveFields = [...new Set([...baseFields, ...requestedFields])];

  let select = {};
  effectiveFields.forEach(field => {
    if (field === 'images') {
      select.images = {
        select: {
          id: true,
          path: true, // Prisma retorna 'path', o mapeamento para 'content' é feito na saída
        },
      };
    } else if (field === 'options') {
      select.options = {
        select: {
          id: true,
          title: true,
          shape: true,
          type: true,
          values: true,
        },
      };
    } else if (field === 'category_ids') {
      // Para obter category_ids, precisamos da relação categories
      select.categories = {
        select: {
          categoryId: true,
        },
      };
    } else {
      select[field] = true;
    }
  });

  // --- 2. Construir o Objeto 'where' para Filtros ---
  const where = {};

  // Filtro 'match' (nome ou descrição)
  if (queryParams.match) {
    where.OR = [
      { name: { contains: queryParams.match, mode: 'insensitive' } },
      { description: { contains: queryParams.match, mode: 'insensitive' } },
    ];
  }

  // Filtro 'category_ids'
  if (queryParams.category_ids) {
    const categoryIds = queryParams.category_ids.split(',').map(Number).filter(id => !isNaN(id) && id > 0);
    if (categoryIds.length > 0) {
      where.categories = {
        some: {
          categoryId: {
            in: categoryIds,
          },
        },
      };
    } else {
      throw new Error('category_ids deve conter IDs numéricos válidos separados por vírgula.');
    }
  }

  // Filtro 'price-range'
  if (queryParams['price-range']) {
    const priceRange = queryParams['price-range'].split('-').map(Number);
    if (priceRange.length === 2 && !isNaN(priceRange[0]) && !isNaN(priceRange[1]) && priceRange[0] >= 0 && priceRange[1] >= 0 && priceRange[0] <= priceRange[1]) {
      where.price = {
        gte: priceRange[0],
        lte: priceRange[1],
      };
    } else {
      throw new Error('price-range deve estar no formato "min-max" com valores numéricos válidos (ex: 100-200).');
    }
  }

  
  for (const key in queryParams) {
    if (key.startsWith('option[') && key.endsWith(']')) {
      const optionId = parseInt(key.substring(7, key.length - 1), 10);
      const optionValues = queryParams[key].split(',').map(val => val.trim()).filter(val => val !== '');

      if (isNaN(optionId) || optionId <= 0) {
        throw new Error(`ID de opção inválido no filtro "${key}".`);
      }
      if (optionValues.length === 0) {
        throw new Error(`Valores para a opção ${optionId} são obrigatórios e não podem ser vazios.`);
      }

      
      where.options = {
        some: {
          AND: [
            { id: optionId },
            {
              
              OR: optionValues.map(val => ({
                values: {
                  contains: val,
                  mode: 'insensitive',
                },
              })),
            },
          ],
        },
      };
    }
  }


  // --- 3. Chamar o repositório ---
  const { data, total } = await productRepository.searchProductsRepository({
    limit,
    offset,
    where,
    select,
  });

  // --- 4. Formatar a resposta final ---
  const formattedData = data.map(product => {
    const productOutput = {};

    // Incluir campos diretos e mapear images/options/category_ids
    effectiveFields.forEach(field => {
      if (field === 'images' && product.images) {
        productOutput.images = product.images.map(img => ({
          id: img.id,
          content: img.path,
        }));
      } else if (field === 'options' && product.options) {
        productOutput.options = product.options.map(opt => ({
          id: opt.id,
          title: opt.title,
          shape: opt.shape,
          type: opt.type,
          values: opt.values,
        }));
      } else if (field === 'category_ids' && product.categories) {
        productOutput.category_ids = product.categories.map(pc => pc.categoryId);
      } else if (product[field] !== undefined) { 
        productOutput[field] = product[field];
      }
    });

    // Garante que price_with_discount seja 0 se for null, apenas se estiver presente no select.
    if (productOutput.hasOwnProperty('price_with_discount') && productOutput.price_with_discount === null) {
      productOutput.price_with_discount = 0;
    }

    return productOutput;
  });

  return {
    data: formattedData,
    total: total,
    limit: limit,
    page: (limit === -1) ? 1 : page,
  };
};

module.exports = {
  searchProducts,
};