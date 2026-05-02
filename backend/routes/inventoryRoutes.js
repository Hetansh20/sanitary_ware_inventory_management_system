const express = require('express');
const router = express.Router();
const { getInventory } = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getInventory);

module.exports = router;
