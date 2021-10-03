const messageDBConnection = require("../../repository/message-db-connection");
const knex = require("knex")(messageDBConnection);

class messageRepository {
  constructor(tableName) {
    this.tableName = tableName;
    this.createTable();
  }

  createTable = async () => {
    try {
      const exists = await knex.schema.hasTable(this.tableName);

      if (!exists) {
        knex.schema
          .createTable(this.tableName, (table) => {
            table.increments("id");
            table.string("email");
            table.integer("message");
            table.string("date");
          })
          .then(() => {
            console.log("¡Tabla de mensajes creada!");
          })
          .catch((error) => {
            console.log("error:", error);
            throw error;
          })
          .finally(() => {
            console.log("Cerrando conexion...");
            knex.destroy();
          });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  new = (message) => {
    return new Promise((resolve) => {
      knex(this.tableName)
        .insert(message)
        .then(() => {
          console.log("Mensaje agregado a la tabla");
          resolve();
        })
        .catch((error) => {
          console.log("error:", error);
          resolve();
        });
    });
  };

  get = () => {
    return new Promise((resolve) => {
      knex
        .from("messages")
        .select("*")
        .then((rows) => {
          const messages = Object.values(JSON.parse(JSON.stringify(rows)));
          resolve(messages);
        })
        .catch((error) => {
          console.log("error:", error);
          resolve();
        });
    });
  };
}

module.exports = messageRepository;
