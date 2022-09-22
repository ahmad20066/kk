const express = require('express');
const router = express.Router();
const controller = require('../controllers/order_controller')
router.get('/:user',controller.getOrders);
router.post('/',controller.placeOrder);
router.delete('/:orderId',controller.deleteOrder);
router.get('/:orderId',controller.getOrder);

module.exports = router;