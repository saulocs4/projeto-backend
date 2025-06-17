const express = require('express');
const productControllers = require('../controllers/product');

const router = express.Router();

// Rota para obter uma lista de produtos com filtros e paginação
router.get('/search', productControllers.searchProductsController);

// Rota para obter um produto pelo ID
router.get('/:id', productControllers.getProductByIdController);

module.exports = router;