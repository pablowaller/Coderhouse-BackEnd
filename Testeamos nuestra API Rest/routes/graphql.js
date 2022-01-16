const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const controller = require('../controllers/product');

var schema = buildSchema(`
    type Product {
        id: String,
        price: String,
        thumbnail: String,
        timestamp: String
    },
    type Query {
        products: [Product]
    },
    type Mutation {
        storeProduct(price: String!, thumbnail: String!, timestamp: String!): Product,
        ProductById(id: String): Product,
        deleteProductById(id: String): Product
    },
`);

const storeProduct = async function ({ price, thumbnail, timestamp }) {
    let product = { price, thumbnail, timestamp };
    return await controller.create(product);
};

const products = async function () {
    return await controller.find();
}

const productById = async function ({ id }) {
    return await controller.findById(id);
}

const deleteProductById = async function ({id}) {
    return await controller.delete(id);
}

const root = {
    products: products,
    storeProduct: storeProduct,
    ProductById: ProductById,
    deleteProductById: deleteProductById
};

module.exports.start = function () {
    return graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    });
}