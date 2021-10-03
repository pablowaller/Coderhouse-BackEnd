const messageDbConnection = {
  client: "sqlite3",
  connection: {
    filename: __dirname + "/../db/messages.sqlite",
  },
  useNullAsDefault: true,
};

module.exports = messageDbConnection;
