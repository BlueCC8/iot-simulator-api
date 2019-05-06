const express = require('express');

const router = express.Router();
const PolygonController = require('../../controllers/Polygon_controller');

router.get('/greet', PolygonController.greeting);
router.post('/', PolygonController.create);
router.get('/', PolygonController.readAll);
router.get('/:id', PolygonController.readOne);
router.put('/:id', PolygonController.update);
router.delete('/:id', PolygonController.delete);

module.exports = router;
