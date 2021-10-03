var socket = io();

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    socket.emit("insertarProducto", {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value,
    });
});

socket.on("actualizarListado", (listado) => {
    actualizarListado(listado);
});

function actualizarListado(listado) {
    function generateHtmlProduct(producto) {
        return `
        <tr>
            <td>${producto.title}</td>
            <td>${producto.price}</td>
            <td><img width="50" src=${producto.thumbnail} alt="not found" /></td>
        </tr>
    `;
    }
    
    let productos = "";

    listado.forEach((p) => {
        productos += generateHtmlProduct(p);
    });

    document.querySelector(".table").innerHTML = `
        <tr>
            <th>Nombre:</th>
            <th>Precio<:/th>
            <th>Foto URL:</th>
        </tr>
        ${productos}
    `;
}