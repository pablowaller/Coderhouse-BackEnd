const http = require('http');

const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

const router = require('./routes/router');
const mvcRouter = require('./routes/mvcRoutes');

app.use('/api', router);
app.use('/', mvcRouter);

const server = http.createServer(app);
const io = require('./lib/websockets');
io.setup(server);

const PORT = 8080;

server.listen(PORT, () => {
    console.log("Servidor funcionando en el puerto" + " " + PORT);
});

server.on('error', error => {
    console.warn('Error en el servidor:', error);
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Hubo un error');
});

module.exports = server;


