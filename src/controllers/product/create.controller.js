const productServices = require('../../services/product');

/**
 * Controlador para criar um novo produto.
 * POST /v1/product
 */
const createProductController = async (req, res) => {
  try {
    const productData = req.body; // Pega o payload do corpo da requisição

    const newProduct = await productServices.createProduct(productData);

    // Retorna o produto criado com status 201 Created
    res.status(201).json(newProduct);

  } catch (error) {
    console.error('Erro ao criar produto:', error);

    // Trata erros de validação específicos que vêm do serviço (400 Bad Request)
    if (error.message.includes('obrigatório') ||
        error.message.includes('inválido') ||
        error.message.includes('já está em uso') ||
        error.message.includes('não foram encontradas')) {
      return res.status(400).json({ message: error.message });
    }

    // Erro interno do servidor para outros casos
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

module.exports = {
  createProductController,
};