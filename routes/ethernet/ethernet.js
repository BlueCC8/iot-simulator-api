const express = require('express');
const multer = require('../../config/multer/multer');
const EthernetController = require('../../controllers/Ethernet_controller');

const router = express.Router();

router.get('/greet', EthernetController.greeting);
router.post('/', multer.single('image'), EthernetController.create);
router.get('/', EthernetController.readAll);
router.get('/:id', EthernetController.readOne);
router.put('/:id', multer.single('image'), EthernetController.update);
router.delete('/:id', EthernetController.delete);

module.exports = router;
