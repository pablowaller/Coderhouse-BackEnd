const express = require("express");
const router = express.Router();
const controller = require('../controllers/product');

router.get('/productos', async (req, res) => {
    try {
        let articles = await controller.find();
        res.send(articles);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.post('/guardar', async (req, res) => {
    try {
        let created = await controller.create(req.body);
        res.send(created);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.put('/actualizar/:id', async (req, res) => {
    try {
        let updated = await controller.update(req.params.id, req.body);
        res.send(updated);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.delete('/borrar/:id', async (req, res) => {
    try {
        let deleted = await controller.delete(req.params.id);
        res.send(deleted);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get("/listar", async (req, res) => {
  try {
    let products = await controller.findAll();
    res.send(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get('/listar/:id', async (req, res) => {
    try {
        let product = await controller.findById(req.params.id);
        res.send(product);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


module.exports = router;
