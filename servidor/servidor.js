const fs = require("fs/promises");
const express = require('express');
const app = express();
const PORT = 8080;

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const read = () => {
    const data = fs.readFile('./productos.txt');
    return data;
};

const server = app.listen(PORT, () =>
    console.log("Servidor funcionando en el puerto ", PORT)
);

server.on("error", (err) => {
    console.log("ERROR =>", err);
});

app.get("/productos", async (request, response) => {
    const productos = JSON.parse(await read());
    response.json({ '': productos });
});

app.get("/producto-random", async (request, response) => {
    const productos = JSON.parse(await read());
    const productosLength = productos.length;
    const random = aleatorio(0, productosLength);
    response.json({ '': productos[random] });
});



