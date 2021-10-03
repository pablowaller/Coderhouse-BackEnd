const express = require("express");
const router = express.Router();

const Product = require("../api/product");

const ProductRepository = require("../repository/product-repository/product-repository");

const productRepository = new ProductRepository("productos");

router.post("/guardar", async (req, res) => {
  const product = new Product(
    req.body.title,
    req.body.price,
    req.body.thumbnail
  );

  try {
    await productRepository.new(product);

    const products = await productRepository.get();

    const io = req.app.get("io");
    io.emit("products", products);

    return res.status(200).json(products);
  } catch (err) {
    return res.status(400).json({ Message: err.Message, HasErrors: true });
  }
});

router.put("/actualizar/:id", async (req, res) => {
  const product = new Product(
    req.body.title,
    req.body.price,
    req.body.thumbnail
  );

  try {
    await productRepository.update(product, Number(req.params.id));

    const products = await productRepository.get();

    const io = req.app.get("io");
    io.emit("products", products);

    return res.status(200).json(products);
  } catch (err) {
    return res.status(400).json({ Message: err.Message, HasErrors: true });
  }
});

router.delete("/borrar/:id", async (req, res) => {
  try {
    await productRepository.delete(Number(req.params.id));

    const products = await productRepository.get();

    const io = req.app.get("io");
    io.emit("products", products);

    return res.status(200).json(products);
  } catch (err) {
    return res.status(400).json({ Message: err.Message, HasErrors: true });
  }
});

router.get("/listar", async (req, res) => {
  const objs = await productRepository.get();

  res.status(200).json(objs);
});

router.get("/listar/:id", async (req, res) => {
  const objs = await productRepository.getById(Number(req.params.id));

  res.status(200).json(objs);
});

module.exports = router;
