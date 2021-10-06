const fs = require("fs");

const PATH = "./carritos.txt";

class CarritoRepositorio {
  constructor() {
    
  }

  guardar = async (carritos) => {
    try {
      await fs.promises.writeFile(PATH, JSON.stringify(carritos));
    } catch (error) {
      throw new Error(error);
    }
  };

  getCarritos = async () => {
    try {
      const carritos = await fs.promises.readFile(PATH);
      const json = JSON.parse(carritos.toString());

      return json;
    } catch {
      return [];
    }
  };
}

module.exports = new CarritoRepositorio();