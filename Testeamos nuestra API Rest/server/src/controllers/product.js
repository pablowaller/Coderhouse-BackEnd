const daoFactory = require('../dao/DAOFactory');
const config = require('../config/config');

class ProductController {

    constructor() {
        this.productDao = daoFactory.getPersistence('product', config.PERSISTENCE);
    }

    async find(query = {}) {
        return await this.productDao.find(query);
    }

    async create(data) {
        return await this.productDao.create(data);
    }

    async findById(id) {
        let product = await this.productDao.findById(id);
        return product.toJSON();
    }

    async update(id, data) {
        return await this.productDao.update(id, data);
    }

    async delete(id) {
        return await this.productDao.delete(id);
    }
}

module.exports = new ProductController();
