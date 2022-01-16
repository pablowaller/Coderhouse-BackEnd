const express = require("express");
const session = require('express-session');
const cookieParser = require('cookie-parser');
var passport = require("passport");
const app = express();

const compression = require('compression');
const helmet = require('helmet');



app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(compression());
app.use(helmet());

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
  console.log("Usuario Conectado");
});

const PORT = 8080;

http.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

http.on('error', error => {
  console.log('Error en el servidor:', error);
});



