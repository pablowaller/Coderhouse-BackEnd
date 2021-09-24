const express = require("express");
const router = express.Router();

const ProductoRepositorio = require("../repository/producto-repositorio");
const Producto = require("../api/producto");

let productos;

const cargarProductos = async () => {
  productos = await ProductoRepositorio.getProductos();
};

cargarProductos();

router.use(function (req, res, next) {
  if (req.url.includes("listar")) {
    return next();
  }

  if (req.headers["administrador"] === "false") {
    return res.status(401).json({ error: "-1", descripcion: "Unauthorized" });
  }

  next();
});

router.get("/listar", async (req, res) => {
  return res.json(productos);
});

router.get("/listar/:id", (req, res) => {
  try {
    return res.json(productos.filter((p) => String(p.id) === req.params.id));
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.post("/guardar", (req, res) => {
  try {
    productos.push(getProducto(req.body));

    ProductoRepositorio.guardar(productos);

    return res.status(200).json({ message: "producto guardado" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.put("/actualizar/:id", (req, res) => {
  try {
    const index = productos.findIndex((p) => String(p.id) === req.params.id);
    if (index < 0) {
      return res.status(400).json({ message: "El producto no éxiste" });
    }

    let producto = getProducto(req.body, req.params.id);

    productos[index] = producto;

    ProductoRepositorio.guardar(productos);

    return res.status(200).json({ message: "Producto actualizado" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.delete("/borrar/:id", (req, res) => {
  try {
    const index = productos.findIndex((p) => String(p.id) === req.params.id);
    if (index < 0) {
      return res.status(400).json({ message: "El producto no existe" });
    }
    productos.splice(index, 1);

    ProductoRepositorio.guardar(productos);

    return res.status(200).json({ message: "producto borrado" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

const getProducto = (body, id = null) => {

  if (!id) {
    id = productos.length + 1;
  }

  const producto = new Producto(
    id,
    Date.now().toLocaleString("es-AR"),
    body.nombre,
    body.descripcion,
    body.codigo,
    body.foto,
    body.precio,
    body.stock
  );

  return producto;
};

module.exports = router;