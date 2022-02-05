const koa = require('koa');
const koaBody = require('koa-body');

const app = new koa();

app.use(koaBody());

let products = require('./products.js');

app.use(products.routes());

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor koa escuchando en el puerto ${server.address().port}`);
}); 

server.on('error', error => console.log('Error en Servidor koa: ', error));