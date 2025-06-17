const categoryServices = require('../../services/category'); // Importa o índice dos serviços de categoria

// GET /v1/category/:id

const getCategoryByIdController = async (req, res) => {
  try {
    const { id } = req.params;

   
    const category = await categoryServices.getCategoryById(id);

    
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada.' });
    }

    
    res.status(200).json(category);

  } catch (error) {
    console.error('Erro ao buscar categoria por ID:', error); // Loga o erro para depuração

    
    if (error.message.includes('ID da categoria inválido')) {
      return res.status(400).json({ message: error.message });
    }

   
    res.status(500).json({ message: 'Erro interno do servidor ao buscar categoria.' });
  }
};

module.exports = {
  getCategoryByIdController,
};