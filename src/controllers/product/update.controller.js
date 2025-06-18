const productServices = require('../../services/product');

//Controlador para atualizar um produto existente.
//PUT /v1/product/:id

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProduct = await productServices.updateProduct(id, updateData);

   
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    
    res.status(204).send();

  } catch (error) {
    console.error('Erro ao atualizar produto:', error);

    
    if (error.message.includes('ID do produto inválido')) {
      return res.status(400).json({ message: error.message });
    }
   
    if (error.message.includes('O slug') && error.message.includes('já está em uso')) {
      return res.status(400).json({ message: error.message });
    }

   
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

module.exports = {
  updateProductController,
};