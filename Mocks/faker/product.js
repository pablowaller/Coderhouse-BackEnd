const faker = require("faker");

class ProductFaker {
  constructor() {}

  create() {
    return {
      id: faker.datatype.uuid(),
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      thumbnail: faker.image.imageUrl(),
    };
  }
}

module.exports = new ProductFaker();
