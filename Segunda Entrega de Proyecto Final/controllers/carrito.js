const factoryDB = require("../repository/factory-db");

class CarritoController {
  constructor() {
    this.repository = factoryDB.getRepository("carrito");
  }

  create = (entitie) => {
    this.repository.create(entitie);
  };

  update = (id, entitie) => {
    this.repository.update(id, entitie);
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
