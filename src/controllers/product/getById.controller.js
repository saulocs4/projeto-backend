const productServices = require('../../services/product');


// GET /v1/product/:id

const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params; 

    
    const product = await productServices.getProductById(id);

    
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

   
    res.status(200).json(product);

  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error);

    
    if (error.message.includes('ID do produto inválido')) {
      return res.status(400).json({ message: error.message });
    }

   
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

module.exports = {
  getProductByIdController,
};