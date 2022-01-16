const IDao = require('../IDao');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const config = require('../../config/config');
const ProductDTO = require('../../dto/productDTO');

class MongoDBDao extends IDao {

    constructor() {
        super();
        this.collectionName = 'products';
        this.connection = mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    async create(data) {
        return await mongoose.connection.db.collection(this.collectionName).insertOne(data);
    }

    async findById(id) {
        let product = await mongoose.connection.db.collection(this.collectionName).findOne({ 'id': ObjectId(id) });
        return new ProductDTO(product.id, product.price, product.thumbnail, product.timestamp);
    }

    async find(query = {}) {
        let products = await mongoose.connection.db.collection(this.collectionName).find(query).toArray();
        return products.map(product => {
            return new ProductDTO(product.id, product.price, product.thumbnail, product.timestamp).toJSON();
        });
    }

    async update(id, data) {
        return await mongoose.connection.db.collection(this.collectionName).findOneAndUpdate({ 'id': ObjectId(id) }, { $set: data });
    }

    async delete(id) {
        return await mongoose.connection.db.collection(this.collectionName).findOneAndDelete({ 'id': ObjectId(id) });
    }
}

module.exports = new MongoDBDao();