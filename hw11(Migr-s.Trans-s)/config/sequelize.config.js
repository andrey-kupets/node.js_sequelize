const {
    ROOT_DB_PASSWORD, DATABASE, USER, DB_TYPE_MYSQL, HOST
} = require('./config');

module.exports = {
    development: {
        username: USER,
        password: ROOT_DB_PASSWORD,
        database: DATABASE,
        host: HOST, // HOST = 'localhost'
        dialect: DB_TYPE_MYSQL
    }
};
