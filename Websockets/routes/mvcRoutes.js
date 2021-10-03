const express = require('express');
const router = express.Router();

const productos = require('../api/productos');

router.get('/', (req, res) => {
    res.render('vista', {
        hayProductos: true,
        productos: productos.getProductos(),
    });
});

module.exports = router;