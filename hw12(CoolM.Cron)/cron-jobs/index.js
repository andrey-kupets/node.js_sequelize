const cron = require('node-cron');

const calcUserCount = require('./statCalc');

module.exports = () => {
    cron.schedule('*/10 * * * * *', () => {
        calcUserCount();
        console.log('every 10');
    });
};
