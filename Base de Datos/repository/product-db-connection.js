const productDBConnection = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "productos",
  },
  pool: { min: 0, max: 15 },
};

module.exports = productDBConnection;
