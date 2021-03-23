const router = require('express').Router();

const { studentController } = require('../controller');

router.route('/')
    .post(
        studentController.createStudent
    )
    .get(
        studentController.getAll
    );

router.route('/:stuId')
    .delete(studentController.deleteStudent)
    .put(studentController.updateStudent);

module.exports = router;
