const productServices = require('../../services/product');

// Controlador para deletar um produto pelo seu ID.
// DELETE /v1/product/:id
const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params; 
    const isDeleted = await productServices.deleteProduct(id);

    if (!isDeleted) {
      
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    
    res.status(204).send();

  } catch (error) {
    console.error('Erro ao deletar produto:', error);

    
    if (error.message.includes('ID do produto inválido')) {
      return res.status(400).json({ message: error.message });
    }

    
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

module.exports = {
  deleteProductController,
};