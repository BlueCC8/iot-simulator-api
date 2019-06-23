const express = require('express');

const router = express.Router();

const UserController = require('../../controllers/User_controller');
const PassportController = require('../../config/passport/passport_controller');

router.post('/signup', PassportController.register);
// * Logout Handler
router.all('/logout', PassportController.logout);
router.post('/login', PassportController.authenticatePassport);

router.get('/greet', UserController.greeting);
// router.post('/api/user', UserController.create);
router.get('/', UserController.readAll);
router.get('/:username', PassportController.authMiddleWare, UserController.readOne);
router.put('/:username', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;
