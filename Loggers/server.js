const express = require("express");
const session = require('express-session');
const cookieParser = require('cookie-parser');

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

const auth = (req, res, next) => {
  if (
    req.session &&
    req.session.username 
  ) {
    return next();
  } else {
    res.redirect("/login");
  }
};

app.use(express.static(__dirname + "/public", options));
app.use("/views", auth, express.static(__dirname + "/views", options));

app.use((err, req, res, next) => {
  console.error(err.message);
  return res.status(500).send("Algo se rompio!");
});

app.get("/", auth, (req, res) => {
  res.redirect("/views/productos");
});

app.post("/login", (req, res) => {
  if (!req.body.username) {
    res.send("Login fallo");
  } else if (req.body.username) {
    req.session.username = req.body.username
    return res.redirect("/views/productos");
  }
  res.send("Login fallo");
});


app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) return res.redirect("logout");
    else res.send({ status: "Logout ERROR", body: err });
  });
});

app.get("/getUserName", (req, res) => {
  res.json(req.session.username);
});

const productsRouter = require("./routes/products.routes");
app.use("/productos", productsRouter, auth);

const messagesRouter = require("./routes/messages.routes");
app.use("/mensajes", messagesRouter);

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


