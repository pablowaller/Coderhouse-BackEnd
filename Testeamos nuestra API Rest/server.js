const express = require("express");
const compression = require('compression');
const helmet = require('helmet');
const logger = require('morgan');
const chalk = require('chalk');
const config = require('./config/config');
const cors = require('cors');

require('dotenv').config();

const success = chalk.green;
const error = chalk.red;

const app = express();

app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const corsOptions = {
    origin: process.env.ORIGIN,
    optionSuccessStatus: 200,
    methods: "GET, PUT, POST, DELETE"
}

app.use(cors(corsOptions));

app.use(express.static("public"));

const messagesRouter = require("./routes/messages.routes");

app.use("/", messagesRouter);

if (config.ENV === 'development') {
    app.use(logger('dev'));
    const graphiql = require('./routes/graphql');
    app.use('/products', graphiql.start());
} else {
    const productRouter = require('./routes/products.routes');
    app.use('/api', productRouter);
}

app.use(function (err, req, res, next) {
    console.log(error(err.message));
    res.status(500).json({ code: 500, message: err.message });
});

process.on('unhandledRejection', function (err) {
    console.log(error(err.stack));
});

app.set('host', config.HOST);
app.set('port', config.PORT);

app.listen(app.get('port'), async () => {
    console.log(success(`[server] - started in ${app.get('host')}:${app.get('port')} in ${config.ENV} - GRAPHIQL: ${config.GRAPHIQL}`));
});
