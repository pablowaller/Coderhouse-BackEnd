const express = require("express");
const router = express.Router();

const controller = require("../controllers/producto");

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
  try {
    const objs = await controller.findAll(req.query);
    res.status(200).json(objs);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.get("/listar/:id", async (req, res) => {
  try {
    const objs = await controller.findById(req.params.id);
    res.status(200).json(objs);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.post("/guardar", async (req, res) => {
  try {
    await controller.create(req.body);
    return res.status(200).json({ message: "Producto guardado" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.put("/actualizar/:id", async (req, res) => {
  try {
    await controller.update(req.params.id, req.body);
    return res.status(200).json({ message: "Producto actualizado" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.delete("/borrar/:id", async (req, res) => {
  try {
    await controller.delete(req.params.id);
    return res.status(200).json({ message: "Producto borrado" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
