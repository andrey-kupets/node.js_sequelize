const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const ErrorHandler = require('../messages/ErrorHandler');
const { INCORRECT_ACTION } = require('../messages/error.messages');
const { responseCodesEnum } = require('../constant');
const { ROOT_EMAIL, ROOT_EMAIL_PASSWORD } = require('../config/config');
const templatesInfo = require('../email-templates');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporterMail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, action, context) => {
    try {
        const templateInfo = templatesInfo[action];

        if (!templateInfo) {
            throw new ErrorHandler(responseCodesEnum.BAD_REQUEST,
                INCORRECT_ACTION.customCode,
                INCORRECT_ACTION.ua);
        }

        const html = await templateParser.render(templateInfo.templateName, context);

        return transporterMail.sendMail({
            from: 'NowhereMan',
            to: userMail,
            subject: templateInfo.subject,
            html // совпадают ключ и велью
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    sendMail
    // объектом, потому что делаем заготовку на будущее для разных рассылок
};
