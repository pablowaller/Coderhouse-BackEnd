const carritoModel = require("../../models/carrito");

class Carrito {
  constructor() {}

  create = async (producto) => {
    try {
      return await carritoModel.create(producto);
    } catch (err) {
      console.error(err.message);
    }
  };

  update = async (id, producto) => {
    try {
      return await carritoModel.findByIdAndUpdate(id, producto);
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
