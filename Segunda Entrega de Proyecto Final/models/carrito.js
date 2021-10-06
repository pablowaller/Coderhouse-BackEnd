const mongoose = require("mongoose");

const schema = mongoose.Schema({
  timestamp_carrito: { type: Date, default: new Date() },
  nombre: { type: String, require: true },
  precio: { type: Number, require: true },
  descripcion: { type: String },
  foto: { type: String },
  stock: { type: Number },
  timestamp_producto: { type: Date, default: new Date() },
});

module.exports = mongoose.model("carritos", schema);