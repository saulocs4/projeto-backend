const express = require('express');
const categoryControllers = require('../controllers/category');

const router = express.Router();

// Rota para obter uma lista de categorias com filtros
router.get('/search', categoryControllers.searchCategoriesController);

// Rota para obter uma categoria por ID <-- ADICIONE ESTA ROTA
router.get('/:id', categoryControllers.getCategoryByIdController);

// Rota para criar uma nova categoria
router.post('/', categoryControllers.createCategoryController);

// Rota para atualizar uma categoria existente
router.put('/:id', categoryControllers.updateCategoryController);

// Rota para deletar uma categoria existente
router.delete('/:id', categoryControllers.deleteCategoryController);


module.exports = router;