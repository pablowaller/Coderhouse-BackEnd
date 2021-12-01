const { db_productos, db_mensajes } = require("../database/knex");

// Productos
function crearTablaProductos() {
  db_productos.schema
    .createTable("productos", (table) => {
      table.increments("id");
      table.string("title");
      table.decimal("price");
      table.string("thumbnail");
    })
    .then(() => {
      //Popular la tabla con valores iniciales
      db_productos("productos")
        .insert([
          {
            title: "Escuadra",
            price: 123.45,
            thumbnail:
              "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
            id: 1,
          },
          {
            title: "Calculadora",
            price: 234.56,
            thumbnail:
              "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
            id: 2,
          },
          {
            title: "Globo Terráqueo",
            price: 345.67,
            thumbnail:
              "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
            id: 3,
          },
        ])
        .then(() => {
          console.log("tabla de productos creada y populada");
        });
    })
    .catch((error) => {
      console.error("error: ", error);
    })
    .finally(() => {
      console.log("cerrando conexion...");
      process.exit(0);
    });
}

// Mensajes
function crearTablaMensajes() {
  db_mensajes.schema
    .createTable("mensajes", (table) => {
      table.increments("id");
      table.string("text");
      table.json("author");
    })
    .then(() => {
      popularTablaMensajes();
      console.log("tabla de mensajes creada");
    })
    .catch((error) => {
      console.log("error:", error);
      throw error;
    })
    .finally(() => {
      console.log("cerrando conexion...");
      process.exit(0);
    });
}

function popularTablaMensajes() {
  const data = [
    {
      author: JSON.stringify({
        email: "lautarojgarcia177@gmail.com",
        nombre: "Lautaro",
        apellido: "Garcia",
        edad: "25",
        alias: "Laucha",
        avatar: "https://avatarfiles.alphacoders.com/125/125100.png",
      }),
      text: "Hola!",
    },
    {
      author: JSON.stringify({
        email: "jperez@gmail.com",
        nombre: "Juan",
        apellido: "perez",
        edad: "30",
        alias: "jperez",
        avatar: "https://avatarfiles.alphacoders.com/168/168720.jpg",
      }),
      text: "Hola, aca andamos todo bien :)",
    },
  ];
  db_mensajes("mensajes")
    .insert(data)
    .then(() => {
      console.log("tabla de mensajes populada");
    });
}

function eliminarTablaMensajes() {
  db_mensajes.schema
    .dropTable("mensajes")
    .then(() => console.log("tabla mensajes eliminada"))
    .catch(console.error);
}

module.exports = {
  crearTablaProductos,
  crearTablaMensajes,
  popularTablaMensajes,
  eliminarTablaMensajes,
};
