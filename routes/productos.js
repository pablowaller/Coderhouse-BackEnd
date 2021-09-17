const express = require('express');
const routerProductos = express.Router();
const esAdmin = require('../middleware/checkAdmin');
const listado = require('../persistence/archivo');

routerProductos.get('/to-list/:id?', async (req, res) => {

    try {
        if (!req.params.id) {
            let contenido = await listado.read();
            if (contenido.length == 0) {
                throw new Error('There is no products uploaded')
            }
            res.json(contenido);
        } else {
            let contenido = await listado.search(req.params.id);
            if (contenido.length == 0) {
                throw new Error('Product not found');
            }
            res.json(contenido);
        }

    } catch (e) {
        res.status(404).json({ "error": e.monthsage });
    }
})

routerProductos.post('/add', esAdmin, async (req, res) => {

    try {
        if (!req.body.nombre || !req.body.descripcion || !req.body.codigo || !req.body.foto
            || !req.body.precio || !req.body.stock) {
            throw new Error("You must complete all the inputs")
        }

        let d = new Date();
        let month = d.getMonth();
        month = month + 1;
        let date = d.getDate() + "/" + month + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

        let productoGuardar = {
            "timestamp": date,
            "nombre": req.body.nombre,
            "descripcion": req.body.descripcion,
            "codigo": req.body.codigo,
            "foto": req.body.foto,
            "precio": req.body.precio,
            "stock": req.body.stock
        };

        let resultado = await listado.save(productoGuardar);

        if (resultado.length == 0) {
            throw new Error("Error saving the file");
        }
        res.json(resultado);
    } catch (e) {
        res.status(404).json({ "error": e.monthsage });
    }
})

routerProductos.put('/update/:id', esAdmin, async (req, res) => {
    try {
        let producto = await listado.search(req.params.id);
        if (producto.length == 0) {
            throw new Error("The product you are looking for does not exist");
        }
        let d = new Date();
        let month = d.getMonth();
        month = month + 1;
        let date = d.getDate() + "/" + month + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

        let productoaModificar = {
            "timestamp": date,
            "nombre": req.body.nombre,
            "descripcion": req.body.descripcion,
            "codigo": req.body.codigo,
            "foto": req.body.foto,
            "precio": req.body.precio,
            "stock": req.body.stock,
            "id": req.params.id
        }
        let productoModificado = await listado.modify(productoaModificar);
        if (productoModificado.length == 0) {
            throw new Error("An error occurred while modifying the product");
        } else {
            res.json(productoModificado);
        }

    } catch (e) {
        res.status(404).send({ "error": e.monthsage });
    }
})

routerProductos.delete('/delete/:id', esAdmin, async (req, res) => {
    try {
        let deleted = await listado.deleteProduct(req.params.id);

        if (deleted == "There are not products on database" || deleted == "Element not found") {
            throw new Error(deleted)
        }
        if (deleted.length == 0) {
            throw new Error("Error deleting product")
        }
        res.json(deleted);
    } catch (e) {
        res.status(404).json({ "error": e.monthsage });
    }
})


module.exports = routerProductos;