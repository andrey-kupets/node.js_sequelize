const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddlewares, userMiddlewares } = require('../middleware');

router.post('/', userMiddlewares.doesUserPresent, authMiddlewares.authValid, authController.authUser);
router.post('/refresh', authMiddlewares.checkRefreshToken, authController.refreshToken);

module.exports = router;
