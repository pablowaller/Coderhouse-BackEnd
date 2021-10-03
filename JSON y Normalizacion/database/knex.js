const options = require('../config/database');
const db_productos = require('knex')(options.mysql);
const db_mensajes = require('knex')(options.sqlite3);

// exporto el objeto para usarlo en otros modulos
module.exports = {
    db_productos,
    db_mensajes
};