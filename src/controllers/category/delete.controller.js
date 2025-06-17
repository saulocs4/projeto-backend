const categoryServices = require('../../services/category'); 

// DELETE /v1/category/:id

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params; 

    
    const deletedCategory = await categoryServices.deleteCategory(id);

    
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Categoria não encontrada.' });
    }

    
    res.status(204).send();

  } catch (error) {
    console.error('Erro ao deletar categoria:', error); 

   
    if (error.message.includes('ID da categoria inválido')) {
      return res.status(400).json({ message: error.message });
    }

  
    res.status(500).json({ message: 'Erro interno do servidor ao deletar categoria.' });
  }
};

module.exports = {
  deleteCategoryController,
};