const express = require('express');

const router = express.Router();
const PolygonController = require('../../controllers/Polygon_controller');
const PassportController = require('../../config/passport/passport_controller');

router.get('/greet', PolygonController.greeting);
router.post('/', PassportController.authMiddleWare, PolygonController.create);
router.get('/', PolygonController.readAll);
router.get('/:id', PolygonController.readOne);
router.put('/:id', PassportController.authMiddleWare, PolygonController.update);
router.delete('/:id', PassportController.authMiddleWare, PolygonController.delete);

module.exports = router;
