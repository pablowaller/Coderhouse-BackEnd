const connection = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "entregafinal2",
  },
  pool: { min: 0, max: 15 },
};

module.exports = connection;
