const express = require('express');

const router = express.Router();
const LinkLayerController = require('../../controllers/LinkLayer_controller');

router.get('/greet', LinkLayerController.greeting);
router.post('/', LinkLayerController.create);
router.get('/', LinkLayerController.readAll);
router.get('/:id', LinkLayerController.readOne);
router.put('/:id', LinkLayerController.update);
router.delete('/:id', LinkLayerController.delete);

module.exports = router;
