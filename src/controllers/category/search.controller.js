const categoryServices = require('../../services/category');

 //GET /v1/category/search

const searchCategoriesController = async (req, res) => {
  try {
    const queryParams = req.query;

    const result = await categoryServices.searchCategories(queryParams);

    res.status(200).json(result);

  } catch (error) {
    console.error('Erro ao buscar categorias:', error);

    // Trata erros específicos conforme o requisito
    if (error.message.includes('O parâmetro use_in_menu deve ser')) {
      return res.status(400).json({ message: error.message });
    }

    // Erro interno do servidor para outros casos
    res.status(500).json({ message: 'Erro interno do servidor ao buscar categorias.' });
  }
};

module.exports = {
  searchCategoriesController,
};