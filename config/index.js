require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST || '127.0.0.1',
    dbPort: process.env.DB_PORT || 27017,
    dbName: process.env.DB_NAME
};

module.exports = { config };
