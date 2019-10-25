const fs = require('fs');
const dotenv = require('dotenv');

const envConfig = dotenv.parse(fs.readFileSync(`${process.env.PWD}/.env`));

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: envConfig.PORT || 3000,
    cors: envConfig.CORS,
    dbUser: envConfig.DB_USER,
    dbPassword: envConfig.DB_PASSWORD,
    dbHost: envConfig.DB_HOST || '127.0.0.1',
    dbName: envConfig.DB_NAME
};

module.exports = { config };
