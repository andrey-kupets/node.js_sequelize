const router = require('express').Router();

const { authMiddlewares } = require('../middleware');
const { adminController } = require('../controller');
const { rolesEnum: { ADMIN, MANAGER } } = require('../constant');

router.route('/students')
    .get(authMiddlewares.checkAccessToken,
        authMiddlewares.checkForRole([
            ADMIN,
            MANAGER
        ]),
        adminController.chooseStudentForBlock);

router.route('/students/:stuId')
    .put(authMiddlewares.checkAccessToken,
        authMiddlewares.checkForRole([
            ADMIN,
            MANAGER
        ]),
        adminController.changeStudentStatus)
    .delete(authMiddlewares.checkAccessToken,
        authMiddlewares.checkForRole([ADMIN]),
        adminController.deleteStudent);
