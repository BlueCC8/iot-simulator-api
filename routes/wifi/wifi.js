const express = require('express');

const router = express.Router();
const WifiController = require('../../controllers/Wifi_controller');

router.get('/greet', WifiController.greeting);
router.post('/', WifiController.create);
router.get('/', WifiController.readAll);
router.get('/:id', WifiController.readOne);
router.put('/:id', WifiController.update);
router.delete('/:id', WifiController.delete);

module.exports = router;
