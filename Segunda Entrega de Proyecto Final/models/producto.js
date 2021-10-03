const mongoose = require("mongoose");

const schema = mongoose.Schema({
  nombre: { type: String, require: true },
  precio: { type: Number, require: true },
  descripcion: { type: String },
  codigo: { type: String, require: true },
  foto: { type: String },
  stock: { type: Number },
  timestamp: { type: Date, default: new Date() },
});

module.exports = mongoose.model("productos", schema);