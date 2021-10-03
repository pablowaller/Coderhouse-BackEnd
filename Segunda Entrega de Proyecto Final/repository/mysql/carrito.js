const connection = require("./connection");
const knex = require("knex")(connection);

class Carrito {
  constructor() {
    this.createTable();
  }

  createTable = async () => {
    try {
      const exists = await knex.schema.hasTable("carritos");

      if (!exists) {
        knex.schema
          .createTable("carritos", (table) => {
            table.increments("id");
            table.timestamp("timestamp_carrito").defaultTo(knex.fn.now());
            table.string("nombre");
            table.string("descripcion");
            table.string("codigo");
            table.integer("precio");
            table.integer("stock");
            table.string("foto");
            table.timestamp("timestamp_producto").defaultTo(knex.fn.now());
          })
          .then(() => {
            console.log("¡Tabla carritos creada!");
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

  create = (product) => {
    return new Promise((resolve) => {
      knex("carritos")
        .insert(product)
        .then(() => {
          console.log("Carrito agregado a la tabla");
          resolve();
        })
        .catch((error) => {
          console.log("error:", error);
          resolve();
        });
    });
  };

  update = (producto, id) => {
    return new Promise((resolve) => {
      knex
        .from("carritos")
        .where("id", id)
        .update(
          { nombre: producto.nombre },
          { descripcion: producto.descripcion },
          { codigo: producto.codigo },
          { precio: producto.precio },
          { stock: producto.stock },
          { foto: producto.foto }
        )
        .then(() => {
          console.log("Carrito actualizado");
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
        .from("carritos")
        .where("id", id)
        .del()
        .then(() => {
          console.log("Carrito eliminado");
          resolve();
        })
        .catch((error) => {
          console.log("error:", error);
          resolve();
        });
    });
  };

  findAll = () => {
    return new Promise((resolve) => {
      knex
        .from("carritos")
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

  findById = (id) => {
    return new Promise((resolve) => {
      knex
        .from("carritos")
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

module.exports = new Carrito();
