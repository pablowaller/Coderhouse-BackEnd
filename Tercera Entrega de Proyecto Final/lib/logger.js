const log4js = require("log4js");

const log4jsConfig = log4js.configure({
    appenders: {
        consola: { type: "console" },
        archivoAlertas: { type: 'file', filename: '././logs/warns.log' },
        ArchivoErrores: { type: 'file', filename: '././logs/errors.log' }
    },
    categories: {
        default: { appenders: ["consola"], level: "trace" },
        consola: { appenders: ["consola"], level: "debug" },
        archivoAlertas: { appenders: ["archivoAlertas"], level: "warn" },
        ArchivoErrores: { appenders: ["ArchivoErrores"], level: "error" },
    }
});

const loggerConsola = log4js.getLogger('consola');
const loggerArchivoAlertas = log4js.getLogger('archivoAlertas');
const loggerArchivoErrores = log4js.getLogger('archivoErrores');

module.exports = {
    log4jsConfig,
    loggerConsola,
    loggerArchivoAlertas,
    loggerArchivoErrores
}