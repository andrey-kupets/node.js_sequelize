const router = require('express').Router();

const { studentController } = require('../controller');
const { authMiddlewares } = require('../middleware');
const { rolesEnum: { ADMIN, MANAGER, USER } } = require('../constant');

router.route('/')
    .post(
        authMiddlewares.checkAccessToken,
        authMiddlewares.checkForRole([
            ADMIN,
            MANAGER,
            USER
        ]),
        studentController.createStudent
    )
    .get(
        studentController.getAll
    );

router.route('/:stuId')
    .delete(studentController.deleteStudent)
    .put(studentController.updateStudent);

module.exports = router;
