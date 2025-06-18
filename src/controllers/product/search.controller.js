const productServices = require('../../services/product');


 // Controlador para obter uma lista de produtos.
 // GET /v1/product/search


const searchProductsController = async (req, res) => {
  try {
    const queryParams = req.query;
    const result = await productServices.searchProducts(queryParams);
    res.status(200).json(result);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    
    res.status(500).json({ message: 'Erro interno do servidor ao buscar produtos.' });
  }
};

module.exports = {
  searchProductsController,
};