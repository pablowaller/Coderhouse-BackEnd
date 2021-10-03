const carritoModel = require("../../models/carrito");

class Carrito {
  constructor() {}

  create = async (entitie) => {
    try {
      return await carritoModel.create(entitie);
    } catch (err) {
      console.error(err.message);
    }
  };

  update = async (id, entitie) => {
    try {
      return await carritoModel.findByIdAndUpdate(id, entitie);
    } catch (err) {
      console.error(err.message);
    }
  };

  delete = async (id) => {
    try {
      return await carritoModel.findByIdAndDelete(id);
    } catch (err) {
      console.error(err.message);
    }
  };

  findAll = async () => {
    try {
      return await carritoModel.find({});
    } catch (err) {
      console.error(err.message);
    }
  };

  findById = async (id) => {
    try {
      return await carritoModel.findById(id);
    } catch (err) {
      console.error(err.message);
    }
  };
}

module.exports = new Carrito();
