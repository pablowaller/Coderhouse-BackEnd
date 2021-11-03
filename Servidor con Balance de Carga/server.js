const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const User = require("./models/user");
const numCPUs = require("os").cpus().length;
const passport = require("passport");
const bcrypt = require("bCrypt");
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const dotenv = require("dotenv");

dotenv.config();

const controllersdb = require("./controllersdb");

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
      maxAge: 60000,
    },
  })
);

const FACEBOOK_CLIENT_ID = process.argv[3] || process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET =
  process.argv[4] || process.env.FACEBOOK_CLIENT_SECRET;

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "emails"],
      scope: ["email"],
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ facebook_id: profile.id }, function (err, user) {

        if (err) {
          console.log(err); 
        }

        if (user) {
          done(null, user); 
        } else {

          var newUser = new User();

          newUser.username = profile.displayName;
          newUser.facebook_id = profile.id;
          newUser.email = profile.emails[0].value;
          newUser.photo = profile.photos[0].value;

          newUser.save(function (err) {
            if (err) {
              console.log("Error in Saving user: " + err);
              throw err;
            }
            console.log("User Registration succesful");
            return done(null, newUser);
          });
        }
      });
    }
  )
);

const http = require("http").Server(app);
var io = require("socket.io")(http);

app.set("io", io);

app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());


var options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html"],
  index: false,
  maxAge: "",
  redirect: false,
};

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

app.use("/views", checkAuthentication, express.static(__dirname + "/views", options));

app.use((err, req, res, next) => {
  console.error(err.message);
  return res.status(500).send("Algo se rompio!");
});

app.get("/", checkAuthentication);

passport.use(
  "login",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) return done(err);
        if (!user) {
          console.log("User Not Found with username " + username);
          return done(
            null,
            false,
            console.log("message", "User Not found.")
          );
        }
        if (!isValidPassword(user, password)) {
          console.log("Invalid Password");
          return done(
            null,
            false,
            console.log("message", "Invalid Password")
          );
        }
        return done(null, user);
      });
    }
  )
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      findOrCreateUser = function () {

        User.findOne({ username: username }, function (err, user) {
          if (err) {
            console.log("Error in SignUp: " + err);
            return done(err);
          }
          if (user) {
            console.log("User already exists");
            return done(
              null,
              false,
              console.log("message", "User Already Exists")
            );
          } else {
            var newUser = new User();
            newUser.username = username;
            newUser.password = createHash(password);

            newUser.save(function (err) {
              if (err) {
                console.log("Error in Saving user: " + err);
                throw err;
              }
              console.log("User Registration succesful");
              return done(null, newUser);
            });
          }
        });
      };

      process.nextTick(findOrCreateUser);
    }
  )
);

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.get("/login");

app.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/faillogin",
    successRedirect: "/views/vista",
  })
);

app.post("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/faillogin",
    successRedirect: "/views/vista",
  })
);
app.get("/faillogin");

app.get("/signup");
app.post(
  "/signup",
  passport.authenticate("signup", {
    failureRedirect: "/failsignup",
    successRedirect: "/views/vista",
  })
);
app.get("/failsignup");

app.get("/info");

app.get("/info", (req, res) => {
  const info = {
    argv: `${process.argv[2]}`,
    so: `${process.platform}`,
    version: `${process.version}`,
    memoryUsage: `${process.memoryUsage}`,
    path: `${process.cwd()}`,
    processId: `${process.pid}`,
    folder: `${process.cwd()}`,
    numberProcess: numCPUs,
  };

  res.json(info);
});

app.get("/getUser", async (req, res) => {
  const userDB = await User.findById(req.user.id);

  if (!userDB.photo) {
    userDB.photo = "/assets/default_pic.png";
  }

  const user = {
    username: userDB.username,
    photo: userDB.photo,
    email: userDB.email,
  };

  res.json(user);
});

app.get("/logoutview");

app.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
});

const productsRouter = require("./routes/products.routes");
app.use("/productos", productsRouter);

const messagesRouter = require("./routes/messages.routes");
app.use("/mensajes", messagesRouter);

const randomsRouter = require("./routes/randoms.routes");
app.use("/random", randomsRouter);

io.on("connect", (socket) => {
  console.log("Usuario Conectado");
});

const PORT = parseInt(process.argv[2]) || 8080;

controllersdb.conectarDB(process.env.MONGO_ATLAS, (err) => {
  if (err) return console.log("Error en conexión de base de datos", err);
  console.log("BASE DE DATOS CONECTADA");

  http.listen(PORT, function (err) {
    if (err) return console.log("Error en el listen server", err);
    console.log(`Server running on ${PORT} ${process.pid}`);
  });
});