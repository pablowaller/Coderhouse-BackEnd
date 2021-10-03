const { Server } = require("socket.io");

const productos = require('../api/productos.js');

// Exporto el websocket
module.exports.setup = function(server) {
    const io = new Server(server);
    io.on('connection', socket => {
        socket.on('insertarProducto', producto => {
            productos.addProducto(producto);
            io.emit('actualizarListado', productos.getProductos());
        });
    });
}
