const express = require('express');
const ProductManager = require('./productManager');

const app = express();
const manager = new ProductManager('productos.json');

app.get('./ProductManager', (req, res) => {
  const { limit } = req.query;
  const products = manager.getProducts(limit);
  res.json(products);
});

app.get('./ProductManager/:pid', (req, res) => {
  const { pid } = req.params;
  const product = manager.getProductById(parseInt(pid));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(8080, () => {
  console.log('Servidor iniciado en el puerto 8080');
});
