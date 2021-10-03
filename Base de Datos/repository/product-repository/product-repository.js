const productDBConnection = require("../../repository/product-db-connection");
const knex = require("knex")(productDBConnection);

class ProductRepository {
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
            table.string("title");
            table.integer("price");
            table.string("thumbnail");
          })
          .then(() => {
            console.log("¡Tabla de productos creada!");
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

  new = (product) => {
    return new Promise((resolve) => {
      knex(this.tableName)
        .insert(product)
        .then(() => {
          console.log("Producto agregado a la tabla");
          resolve();
        })
        .catch((error) => {
          console.log("error:", error);
          resolve();
        });
    });
  };

  update = (product, id) => {
    return new Promise((resolve) => {
      knex
        .from(this.tableName)
        .where("id", id)
        .update(
          { title: product.title },
          { price: product.price },
          { thumbnail: product.thumbnail }
        )
        .then(() => {
          console.log("producto actualizado");
          resolve();
        })
        .catch((error) => {
          console.log("error:", error);
          resolve();
        });
    });
  };

  delete = (id) => {
    return new Promise((resolve) => {
      knex
        .from(this.tableName)
        .where("id", id)
        .del()
        .then(() => {
          console.log("producto eliminado");
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
        .from("productos")
        .select("*")
        .then((rows) => {
          const products = Object.values(JSON.parse(JSON.stringify(rows)));
          resolve(products);
        })
        .catch((error) => {
          console.log("error:", error);
          resolve();
        });
    });
  };

  getById = (id) => {
    return new Promise((resolve) => {
      knex
        .from("productos")
        .select("*")
        .where("id", id)
        .then((rows) => {
          resolve(Object.values(JSON.parse(JSON.stringify(rows))));
        })
        .catch((error) => {
          console.log("error:", error);
          resolve();
        });
    });
  };
}

module.exports = ProductRepository;
