const router = require('express').Router();

const {
 adminRouter, authRouter, carRouter, studentRouter, userRouter
} = require('.');

router.use('/admin', adminRouter);
router.use('/auth', authRouter);
router.use('/cars', carRouter);
router.use('/students', studentRouter);
router.use('/users', userRouter);

module.exports = router;
