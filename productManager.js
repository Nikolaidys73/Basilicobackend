const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.productos = [];
    this.idCounter = 0;
    this.path = filePath;
    this.loadProducts();
  }
   


  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.productos = JSON.parse(data);
      if (this.productos.length > 0) {
        this.idCounter = Math.max(...this.productos.map((p) => p.id)) + 1;
      }
    } catch (error) {
      this.productos = [];
      console.log('Error al cargar los productos:', error.message);
    }
  }

  saveProducts() {
    try {
      const data = JSON.stringify(this.productos, null, 2);
      fs.writeFileSync(this.path, data);
    } catch (error) {
      console.log('Error al guardar los productos:', error.message);
    }
  }

  addProduct(producto) {
    if (!this.isValidProduct(producto)) {
      console.log('Todos los campos del producto son obligatorios.');
      return;
    }

    if (this.isCodeDuplicate(producto.code)) {
      console.log(`El código "${producto.code}" ya está en uso.`);
      return;
    }

    producto.id = this.idCounter++;
    this.productos.push(producto);
    this.saveProducts();
    console.log('Producto agregado correctamente:', producto);
  }

  getProductById(id) {
    const producto = this.productos.find((p) => p.id === id);
    if (producto) {
      console.log('Producto encontrado:', producto);
    } else {
      console.log('Producto no encontrado.');
    }
  }

  updateProduct(id, updatedFields) {
    const index = this.productos.findIndex((p) => p.id === id);
    if (index !== -1) {
      const product = this.productos[index];
      const updatedProduct = { ...product, ...updatedFields };
      this.productos[index] = updatedProduct;
      this.saveProducts();
      console.log('Producto actualizado correctamente:', updatedProduct);
    } else {
      console.log('Producto no encontrado.');
    }
  }

  deleteProduct(id) {
    const index = this.productos.findIndex((p) => p.id === id);
    if (index !== -1) {
      const deletedProduct = this.productos.splice(index, 1)[0];
      this.saveProducts();
      console.log('Producto eliminado correctamente:', deletedProduct);
    } else {
      console.log('Producto no encontrado.');
    }
  }

  isValidProduct(producto) {
    const { title, description, price, thumbnail, code, stock } = producto;
    return (
      title &&
      description &&
      price &&
      thumbnail &&
      code &&
      stock !== undefined
    );
  }

  isCodeDuplicate(code) {
    return this.productos.some((p) => p.code === code);
  }
}

// Ejemplo de uso
const filePath = 'productos.json';
const verifyProduct = new ProductManager(filePath);

verifyProduct.addProduct({
  title: 'Samsung Z flip',
  description: 'Celular Samsung Z Flip ',
  price: 450000,
  thumbnail: 'ruta/imagen1.jpg',
  code: 'PROD001',
  stock: 5,
});

verifyProduct.addProduct({
  title: 'Motorola Rzer ultra',
  description: 'Celular motorola Plegable',
  price: 420000,
  thumbnail: 'ruta/imagen2.jpg',
  code: 'PROD002',
  stock: 3,
});


verifyProduct.addProduct({
  title: 'Iphone 1',
  description: 'iphone 14 pro',
  price : 550000,
  thumbnail: 'ruta/imagen2.jpg',
  code: 'PROD003',
  stock: 5,
}); 



verifyProduct.updateProduct(1, { price: 430000, stock: 10 });

verifyProduct.deleteProduct(2);

module.exports = ProductManager; 