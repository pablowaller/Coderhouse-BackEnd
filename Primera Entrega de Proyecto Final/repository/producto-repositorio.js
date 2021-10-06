const fs = require("fs");

const PATH = "./productos.txt";

class ProductoRepositorio {
  constructor() {
    
  }

  guardar = async (productos) => {
    try {
      await fs.promises.writeFile(PATH, JSON.stringify(productos));
    } catch (error) {
      throw new Error(error);
    }
  };

  getProductos = async () => {
    try {
      const productos = await fs.promises.readFile(PATH);
      return JSON.parse(productos.toString());
    } catch {
      return [];
    }
  };
}

module.exports = new ProductoRepositorio();