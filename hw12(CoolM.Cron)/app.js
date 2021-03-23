const dotenv = require('dotenv');
const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config({ path: path.join(process.cwd(), '../.env') });
// dotenv.config(); тогда нужно прописать правильно путь в терминале

const db = require('./dataBase/MySQL').getInstance();
const cronRun = require('./cron-jobs');

db.setModels();

const { MONGO_URL, PORT } = require('./config/config');
const apiRouter = require('./router/api.router'); // крашится апка, если апи.роутер деструктуризировать с ./router,
const logger = require('./logger/winston')();

const app = express();

_connectDB();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), 'static')));

app.use('/', apiRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    logger.error({
        message: err.message,
        code: err.customCode,
        status: err.status
    });
    res
        .status(err.status || 500)
        .json({
            customCode: err.customcode || 0,
            message: err.message || ''
        });
});

app.listen(PORT, () => {
    console.log(`port ${PORT} is listening`);
    cronRun();
});

function _connectDB() {
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}
