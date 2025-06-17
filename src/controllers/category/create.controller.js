const categoryServices = require('../../services/category');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime/library');

// POST /v1/category

const createCategoryController = async (req, res) => {
  try {
    const categoryData = req.body; 

   
    const newCategory = await categoryServices.createCategory(categoryData);


    res.status(201).json(newCategory);

  } catch (error) {
    console.error('Erro ao cadastrar categoria:', error);


    if (error.message.includes('obrigatório') || error.message.includes('formato correto')) {
      return res.status(400).json({ message: error.message });
    }

    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
      const field = error.meta.target.includes('name') ? 'nome' : 'slug';
      return res.status(400).json({ message: `Já existe uma categoria com este ${field}.` });
    }

 
    res.status(500).json({ message: 'Erro interno do servidor ao cadastrar categoria.' });
  }
};

module.exports = {
  createCategoryController,
};