const { Server } = require("socket.io");

// Importo las instancias de los controladores
const productosController = require('../controladores/productos.js');
const mensajesController = require('../controladores/mensajes.js');

// Exporto el websocket
module.exports.setup = function(server) {
    const io = new Server(server);
    io.on('connection', socket => {
        /* Le envio los productos actualizados al cliente */
        productosController.findAll().then(productos => {
            socket.emit('actualizarListado', productos);
        }).catch(console.error)
        /* Le envio los mensajes actualizados al cliente */
        mensajesController.findAll().then(mensajes => {
            console.log(mensajes);
            socket.emit('messages', mensajes);
        }).catch(console.error)

        /* Eventos */
        socket.on('insertarProducto', producto => {
            productosController.create(producto).then(() => {
                productosController.findAll().then(productos => {
                    io.emit('actualizarListado', productos);
                })
            }).catch(console.error);
        });
        socket.on('new-message', function(message) {
            mensajesController.create(message).then(() => {
                mensajesController.findAll().then(mensajes => {
                    io.sockets.emit('messages', mensajes);
                })
            });
        });
    });
}