const express = require('express');
const router = express.Router();

const productos = require('../api/productos');

router.get('/productos/to-list', (req, res) => {
    res.json(productos.getProductos());
});

router.get('/productos/to-list/:id', (req, res) => {
    res.json(productos.getProducto(req.params.id));
});

router.post('/productos/save', (req, res) => {
    productos.addProducto(req.body);
    res.send('Producto guardado con éxito');
});

router.put('/productos/update/:id', (req, res) => {
    const productoActualizado = productos.updateProducto(req.params.id, req.body);
    !!productoActualizado ? res.send('Producto actualizado') : res.send('No se encontró el producto con el id especificado');
});

router.delete('/productos/delete/:id', (req, res) => {
    productos.deleteProducto(req.params.id);
    res.send('Ese producto no existe o ha sido eliminado');
});

module.exports = router;