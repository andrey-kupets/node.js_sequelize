const router = require('express').Router();

const { studentController } = require('../controller');

router.route('/')
    .post(
        studentController.createStudent
    )
    .get(
        studentController.getAll
    );

module.exports = router;
