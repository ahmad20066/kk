const express = require('express');
const router = express.Router();
const controller = require('../controllers/order_controller')
router.get('/',controller.getOrders);
router.post('/',controller.placeOrder)
module.exports = router;