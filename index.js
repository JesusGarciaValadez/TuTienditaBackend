const express = require('express');

const app = express();

const { config } = require('./config/index');
const furnituresApi = require('./routes/furnitures.js');

const {
    logErrors,
    wrapErrors,
    errorHandler
} = require('./utils/middleware/errorHandler.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

// body parser
app.use(express.json());

// routes
furnituresApi(app);

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
    console.log(`Listening http://localhost:${config.port}`); // eslint-disable-line no-console
});
