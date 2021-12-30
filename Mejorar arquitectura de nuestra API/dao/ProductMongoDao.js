const IProductoDAO = require('./IProductoDAO');
const Product = require('../persistence/models/product');
const ProductDTO = require('../dto/productDTO');

class ProductMongoDAO {

    constructor() {
        super();
    }

    async create(data) {
        return await Product.create(data);
    }

    async findById(id) {
        let product = await Product.findById(id);
        return new ProductDTO(product);
    }

    async findAll() {
        let products = await Product.find();
        return products.map(p => new ProductDTO(p));
    }

    async update(id, toUpdate) {
        return await Product.findByIdAndUpdate(id, toUpdate);
    }

    async remove(id) {
        return await Product.findByIdAndDelete(id);
    }
}

module.exports = ProductMongoDAO;