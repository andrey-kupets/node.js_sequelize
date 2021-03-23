module.exports = class ErrorHandler extends Error {
    constructor(status, customcode, message = '') {
        super(message);
        this.status = status;
        this.customcode = customcode; // 4001 // 40012 - четвёртая или 4/5 цифры - это подвиды кода

        Error.captureStackTrace(this, this.constructor);
    }
};
