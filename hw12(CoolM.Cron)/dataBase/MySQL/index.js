// const mysql2 = require('mysql2');
//
// const {
//  DATABASE, HOST, ROOT_DB_PASSWORD, USER
// } = require('../../config/config');
//
// const connection = mysql2.createConnection({
//     user: USER,
//     password: ROOT_DB_PASSWORD,
//     database: DATABASE,
//     host: HOST
// });
//
// module.exports = connection.promise();

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const {
    DATABASE, ROOT_DB_PASSWORD, USER, DB_TYPE_MYSQL
} = require('../../config/config');

module.exports = (() => {
    let instance;

    const initConnection = () => {
        const client = new Sequelize(DATABASE, USER, ROOT_DB_PASSWORD, { dialect: DB_TYPE_MYSQL });
        const models = {};
        const modelsPath = path.join(process.cwd(), 'dataBase', 'MySQL', 'models');

        const getModels = () => {
            fs.readdir(modelsPath, (err, files) => {
                files.forEach((file) => { // Student.js
                    const [model] = file.split('.'); // ['Student', 'js']
                    // eslint-disable-next-line import/no-dynamic-require
                    const modelFile = require(path.join(modelsPath, model)); // ./DB/MySQL/models/Student

                    models[model] = modelFile(client);
                });
            });
        };

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName],
            transactionInstance: () => client.transaction()
        };
    };

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection(); // .getModel('Student')
            }

            return instance;
        }
    };
})();
