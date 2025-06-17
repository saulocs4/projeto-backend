const express = require('express');
const dotenv = require('dotenv');


dotenv.config();

const app = express();

app.use(express.json());


const userRoutes = require('./routes/user.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');


app.get('/', (req, res) => {
  res.status(200).json({ message: 'API está em execução!' });
});


app.use('/v1/user', userRoutes);
app.use('/v1/category', categoryRoutes);
app.use('/v1/product', productRoutes);


app.use((req, res, next) => {
  res.status(404).json({ message: 'Rota não encontrada.' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno do servidor.' });
});

module.exports = app;
