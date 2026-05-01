const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');
// Assuming you have an auth middleware, if not, we can skip it for now or use existing ones
// const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', warehouseController.getWarehouses);
router.post('/', warehouseController.createWarehouse);
router.put('/:id', warehouseController.updateWarehouse);
router.delete('/:id', warehouseController.deleteWarehouse);

module.exports = router;
