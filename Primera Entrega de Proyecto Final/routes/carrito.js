const express = require("express");
const router = express.Router();

const CarritoRepositorio = require("../repository/carrito-repositorio");

const Carrito = require("../api/carrito");
const Producto = require("../api/producto");

let carritos;

const cargarCarritos = async () => {
  carritos = await CarritoRepositorio.getCarritos();
};

cargarCarritos();

router.get("/listar", async (req, res) => {
  return res.json(carritos);
});

router.get("/listar/:id", (req, res) => {
  try {
    return res.json(carritos.filter((p) => String(p.id) === req.params.id));
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.post("/guardar/:id", (req, res) => {
  try {
    const producto = getProducto(Number(req.params.id), req.body.producto);

    const carrito = new Carrito(
      carritos.length + 1,
      Date.now().toLocaleString("es-AR"),
      producto
    );

    carritos.push(carrito);

    CarritoRepositorio.guardar(carritos);

    return res.status(200).json({ message: "carrito guardado" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.delete("/borrar/:id", (req, res) => {
  try {
    const index = carritos.findIndex((p) => String(p.id) === req.params.id);
    if (index < 0) {
      return res.status(400).json({ message: "El carrito no éxiste" });
    }

    carritos.splice(index, 1);

    CarritoRepositorio.guardar(carritos);

    return res.status(200).json({ message: "carrito borrado" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

const getProducto = (id, producto) => {
  const obj = new Producto(
    id,
    Date.now().toLocaleString("es-AR"),
    producto.nombre,
    producto.descripcion,
    producto.codigo,
    producto.foto,
    producto.precio,
    producto.stock
  );

  return obj;
};

module.exports = router;