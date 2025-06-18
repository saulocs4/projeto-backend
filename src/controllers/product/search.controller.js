const productServices = require('../../services/product');


// GET /v1/product/search

const searchProductsController = async (req, res) => {
  try {
    const queryParams = req.query; // Pega todos os query parameters

    
    const result = await productServices.searchProducts(queryParams);

    
    res.status(200).json(result);

  } catch (error) {
    console.error('Erro ao buscar produtos:', error);

    
    if (error.message.includes('inválido') || error.message.includes('obrigatório') || error.message.includes('formato')) {
      return res.status(400).json({ message: error.message });
    }

    
    res.status(500).json({ message: 'Erro interno do servidor ao buscar produtos.' });
  }
};

module.exports = {
  searchProductsController,
};