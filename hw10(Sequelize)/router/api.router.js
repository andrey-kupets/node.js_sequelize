const router = require('express').Router();

const {
 authRouter, carRouter, studentRouter, userRouter
} = require('./index');

router.use('/auth', authRouter);
router.use('/cars', carRouter);
router.use('/students', studentRouter);
router.use('/users', userRouter);

module.exports = router;
