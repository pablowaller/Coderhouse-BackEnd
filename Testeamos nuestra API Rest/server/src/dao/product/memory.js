const IDao = require('../IDao');
const ProductDTO = require('../../dto/productDTO');

class MemoryDao extends IDao {
    
    constructor() {
         super();
         this.products = [];
    }

    async create(data) {
        let product = { ...data };
        this.products.push(product);
        return product;
    }

    async findById(id) {
        let product = this.products.find(product => product.id == id);
        return new ProductDTO(product.id, product.price, product.thumbnail, product.timestamp);
    }

    async find(query = {}) {
        return this.products;
    }

    async update(id, data) {
        let index = this.products.findIndex(p => p.id === id);
        this.products.splice(index, 1, data);
        return this.products.find(product => product.id == id);
    }

    async delete(id) {
        let index = this.products.findIndex(p => p.id === id);
        this.products.splice(index, 1);
        return this.products;
    }
}

module.exports = new MemoryDao()
