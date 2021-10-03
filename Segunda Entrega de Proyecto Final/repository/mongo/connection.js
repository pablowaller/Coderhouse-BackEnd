const mongoose = require("mongoose");
const config = require("../../config/config.json");

let url;

if (config.DB === 1) {
  url = config.MONGO_URL;
} else if (config.DB === 2) {
  url = config.MONGO_ATLAS;
}

const connection = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Conexión establecida");
});

mongoose.connection.on("error", (error) => {
  console.log("Conexión fallida", error);
});

module.exports = connection;