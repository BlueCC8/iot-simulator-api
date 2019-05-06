const express = require('express');

const router = express.Router();

const RoomController = require('../../controllers/Room_controller');
const PassportController = require('../../config/passport/passport_controller');

router.get('/greet', RoomController.greeting);
router.post('/', PassportController.authMiddleWare, RoomController.create);
router.get('/', RoomController.readAll);
router.get('/:id', RoomController.readOne);
router.put('/:id', PassportController.authMiddleWare, RoomController.update);
router.delete('/:id', PassportController.authMiddleWare, RoomController.delete);

module.exports = router;
