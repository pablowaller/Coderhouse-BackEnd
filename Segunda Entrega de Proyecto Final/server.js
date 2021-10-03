const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const rutaProductos = require("./routes/productos");
const rutaCarrito = require('./routes/carrito');

const PORT = 8080;

app.use("/productos", rutaProductos);

app.use("/carrito", rutaCarrito);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use((req, res) => {
  res.json({ "error": "Ruta no encontrada", "descripcion": `ruta ${req.originalUrl} no implementada` });
})