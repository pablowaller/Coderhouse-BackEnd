const config = require("../config/config.json");

class RepositoryFactoryDb {
  constructor() {
    if (config.DB === 1 || config.DB === 2) {
      require(`../repository/mongo/connection`);
    }
  }

  getRepository(entitie) {
    try {
      let module;

      if (config.DB === 1 || config.DB === 2) {
        module = require(`../repository/mongo/${entitie}`);

        return module;
      }

      if (config.DB === 3) {
        module = require(`../repository/mysql/${entitie}`);

        return module;
      }

      module = require(`../repository/memoria/${entitie}`);

      return module;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new RepositoryFactoryDb();
