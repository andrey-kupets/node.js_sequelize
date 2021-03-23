const router = require('express').Router();

const { studentController } = require('../controller');
const { authMiddlewares } = require('../middleware');

router.route('/')
    .post(
        authMiddlewares.checkAccessToken,
        authMiddlewares.checkForRole([
        'admin',
        'manager',
        'user'
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
