class Productos {
    
    productos;

    constructor() {
        this.productos = [{
            title: "Lentes de Armazón Dorado",
            price: 8999,
            thumbnail: "https://i.pinimg.com/236x/7e/84/a2/7e84a2ae69bc84a41f92043552075c47.jpg",
            id: 1
        },
        {
            title: "Gabán Negro",
            price: 12500,
            thumbnail: "http://d2r9epyceweg5n.cloudfront.net/stores/475/621/products/88681397-08ea-470c-8d84-28ee44cc4fc6_nube-80f166b22861287d7215632146505622-640-0.jpg",
            id: 2,
        },
        {
            title: "Xiaomi Redmi A9",
            price: 35000,
            thumbnail: "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/main_card_image/https/bdt.computerhoy.com/sites/default/files/9A.png",
            id: 3,
        },
        {
            title: "Zapatillas adidas",
            price: 10000,
            thumbnail: "https://essential.vteximg.com.br/arquivos/ids/254432-1000-1000/261-0312_1.jpg",
            id: 4,
        }
        ];
    }

    getProductos() {
        return this.productos;
    }

    getProducto(id) {
        return this.productos.find((producto) => producto.id == id);
    }

    addProducto(producto) {
        this.productos.length === 0 ? (producto.id = 1) : (producto.id = this.productos.length + 1);
        this.productos.push(producto);
    }

    updateProducto(id, producto) {
        const productToUpdate = this.productos.find(producto => producto.id == id);
        if (!!productToUpdate) {
            return Object.assign(productToUpdate, producto);
        } else {
            return undefined;
        }
    }

    deleteProducto(id) {
        this.productos = this.productos.filter(producto => producto.id != id);
    }
}

module.exports = new Productos();