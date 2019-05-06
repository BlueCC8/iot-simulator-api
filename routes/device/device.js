const express = require('express');

const router = express.Router();

const DeviceController = require('../../controllers/Device_controller');
const PassportController = require('../../config/passport/passport_controller');
const multer = require('../../config/multer/multer');

router.get('/greet', DeviceController.greeting);
router.post(
  '/',
  PassportController.authMiddleWare,
  multer.single('image'),
  DeviceController.create
);
router.get('/', DeviceController.readAll);
router.get('/:id', DeviceController.readOne);
router.put(
  '/:id',
  PassportController.authMiddleWare,
  multer.single('image'),
  DeviceController.update
);
module.exports = router;
