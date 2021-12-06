const express = require("express");
const session = require('express-session');
const cookieParser = require('cookie-parser');
var passport = require("passport");
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60000
    },
  })
);

const dotenv = require("dotenv");

require("./database/connection");
require("./database/auth");

dotenv.config();

const loggerConsola = require('./lib/logger').loggerConsola;
loggerConsola.info("Cheese is Comté.")
loggerConsola.warn("Cheese is quite smelly.");
loggerConsola.error("Cheese is too ripe!");
const loggerArchivoAlertas = require('./lib/logger').loggerArchivoAlertas;
loggerArchivoAlertas.info("Cheese is Comté.")
loggerArchivoAlertas.warn("Cheese is quite smelly.");
loggerArchivoAlertas.error("Cheese is too ripe!");
const loggerArchivoErrores = require('./lib/logger').loggerArchivoErrores;
loggerArchivoErrores.info("Cheese is Comté.")
loggerArchivoErrores.warn("Cheese is quite smelly.");
loggerArchivoErrores.error("Cheese is too ripe!");

const http = require("http").Server(app);
var io = require("socket.io")(http);

app.set("io", io);

app.use(express.static("public"));

var options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html"],
  index: false,
  maxAge: "1d",
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set("x-timestamp", Date.now());
  },
};

app.use(express.static(__dirname + "/public", options));
app.use("/views", express.static(__dirname + "/views", options));

app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((err, req, res, next) => {
  console.error(err.message);
  return res.status(500).send("Algo se rompio!");
});


const indexRouter = require("./routes/index");
const authRouter = require('./routes/auth.routes');
const productsRouter = require("./routes/products.routes");
const messagesRouter = require("./routes/messages.routes");

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", productsRouter);
app.use("/", messagesRouter);


io.on("connect", (socket) => {
  loggerConsola.info("Usuario Conectado");
});

const PORT = 8080;

http.listen(PORT, () => {
  loggerConsola.info(`Server running on http://localhost:${PORT}`);
});

http.on('error', error => {
  loggerConsola.error('Error en el servidor:', error);
});



