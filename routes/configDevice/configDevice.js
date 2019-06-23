const express = require('express');

const router = express.Router();

const ConfigDeviceController = require('../../controllers/ConfigDevice_controller');
const PassportController = require('../../config/passport/passport_controller');

router.get('/greet', ConfigDeviceController.greeting);
router.post('/', PassportController.authMiddleWare, ConfigDeviceController.create);
router.get('/', ConfigDeviceController.readAll);
router.get('/:id', ConfigDeviceController.readOne);
router.put('/:id', PassportController.authMiddleWare, ConfigDeviceController.update);
router.delete('/:id', PassportController.authMiddleWare, ConfigDeviceController.delete);

module.exports = router;
