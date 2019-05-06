const express = require('express');

const router = express.Router();
const NetworkLayerController = require('../../controllers/NetworkLayer_controller');

router.get('/greet', NetworkLayerController.greeting);
router.post('/', NetworkLayerController.create);
router.get('/', NetworkLayerController.readAll);
router.get('/:id', NetworkLayerController.readOne);
router.put('/:id', NetworkLayerController.update);
router.delete('/:id', NetworkLayerController.delete);

module.exports = router;
