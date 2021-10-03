const factoryDB = require("../repository/factory-db");

class ProductoController {
  constructor() {
    this.repository = factoryDB.getRepository("producto");
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

  findAll = (params) => {
    return this.repository.findAll(params);
  };

  findById = (id) => {
    return this.repository.findById(id);
  };
}

module.exports = new ProductoController();
