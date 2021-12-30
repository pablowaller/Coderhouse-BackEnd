const MessageMongoDAO = require('../dao/MessageMongoDAO');
const ProductMongoDAO = require('../dao/ProductMongoDao');

module.exports = function(collection, persistenceType) {
    try {
        switch (collection.toLowerCase()) {
            case "messages":
                switch(persistenceType.toLowerCase) {
                    case "mongo":
                        require("../database/connection");
                        return new MessageMongoDAO();
                }
                break;
            case "products":
                switch(persistenceType.toLowerCase()) {
                    case "mongo":
                        require("../database/connection");
                        return new ProductMongoDAO();
                }
                break;
            default:
                console.error("Invalid argument/s", collection, persistenceType);
                throw new Error("Invalid arguments");
        }
    } catch (error) {
        console.error(error);
    }
}