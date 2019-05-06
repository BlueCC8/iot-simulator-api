const express = require('express');

const router = express.Router();
const ApplicationLayerController = require('../../controllers/ApplicationLayer_controller');

router.get('/greet', ApplicationLayerController.greeting);
router.post('/', ApplicationLayerController.create);
router.get('/', ApplicationLayerController.readAll);
router.get('/:id', ApplicationLayerController.readOne);
router.put('/:id', ApplicationLayerController.update);
router.delete('/:id', ApplicationLayerController.delete);

module.exports = router;
