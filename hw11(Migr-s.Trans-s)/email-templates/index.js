const { emailActionsEnum } = require('../constant');

module.exports = {
    [emailActionsEnum.CREATION_OF_ACC]: {
        templateName: 'creation-of-acc',
        subject: 'Welcome to our brotherhood'
    },

    [emailActionsEnum.DELETION_OF_ACC]: {
        templateName: 'deletion-of-acc',
        subject: 'We will be waiting for u'
    },

    [emailActionsEnum.PASSWORD_IS_CHANGED]: {
        templateName: '111',
        subject: 'Ya have to change a password'
    },

    [emailActionsEnum.USER_IS_BLOCKED]: {
        templateName: 'user-is-blocked',
        subject: 'Acc was blocked'
    },
};
