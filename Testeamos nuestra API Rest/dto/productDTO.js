class ProductDTO {

    constructor(productData) {
        this.id = productData.id;
        this.price = productData.price;
        this.thumbnail = productData.thumbnail;
        this.timestamp = productData.timestamp;
    }

    getId() {
        return this.id;
    }

    getPrice() {
        return this.price;
    }

    getThumbnail() {
        return this.thumbnail;
    }

    getTimestamp() {
        return this.timestamp;
    }
}

module.exports = ProductDTO;
