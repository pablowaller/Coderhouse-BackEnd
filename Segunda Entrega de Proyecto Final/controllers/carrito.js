const factoryDB = require("../repository/factory-db");

class CarritoController {
  constructor() {
    this.repository = factoryDB.getRepository("carrito");
  }

  create = (producto) => {
    this.repository.create(producto);
  };

  update = (id, producto) => {
    this.repository.update(id, producto);
  };

  delete = (id) => {
    this.repository.delete(id);
  };

  findAll = () => {
    return this.repository.findAll();
  };

  findById = (id) => {
    return this.repository.findById(id);
  };
}

module.exports = new CarritoController();
