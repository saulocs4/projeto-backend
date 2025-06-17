const categoryServices = require('../../services/category'); 
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime/library'); 

// PUT /v1/category/:id

const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params; 
    const updateData = req.body; 

   
    const updatedCategory = await categoryServices.updateCategory(id, updateData);

    
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Categoria não encontrada.' });
    }

    
    res.status(204).send();

  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
   
    if (error.message.includes('ID da categoria inválido') ||
        error.message.includes('Nenhum dado de atualização') ||
        error.message.includes('deve ser uma string') ||
        error.message.includes('deve ser um booleano')) {
      return res.status(400).json({ message: error.message });
    }

    
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
      const field = error.meta.target.includes('name') ? 'nome' : 'slug';
      return res.status(400).json({ message: `Já existe outra categoria com este ${field}.` });
    }

   
    res.status(500).json({ message: 'Erro interno do servidor ao atualizar categoria.' });
  }
};

module.exports = {
  updateCategoryController,
};