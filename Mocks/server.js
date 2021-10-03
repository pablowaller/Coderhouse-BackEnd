const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dotenv = require("dotenv");

require("./database/connection");

dotenv.config();

const http = require("http").Server(app);
var io = require("socket.io")(http);

app.set("io", io);

app.use(express.static("public"));

const productsRouter = require("./routes/products.routes");
app.use("/productos", productsRouter);

const messagesRouter = require("./routes/messages.routes");
app.use("/mensajes", messagesRouter);

io.on("connect", (socket) => {
  console.log("Usuario Conectado");
});

const PORT = 8080;

http.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

http.on('error', error => {
  console.warn('Error en el servidor:', error);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Hubo un error');
});



